using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using ExcelDataReader;
using Microsoft.Extensions.Configuration;
using SmartSpender.Web.API.Models;
using ClosedXML.Excel;

namespace SmartSpender.Web.API.Services
{
    /// <summary>
    /// Service for creating and appending data to an Excel template file from multiple source folders.
    /// </summary>
    public class ExcelDataImporter
    {
        private readonly IConfiguration _configuration;
        private readonly string _baseFolderPath;
        private readonly string _templateFilePath;

        public ExcelDataImporter(IConfiguration configuration)
        {
            _configuration = configuration;
            _baseFolderPath = _configuration.GetValue<string>("Paths:DataFilePath");
            _templateFilePath = Path.Combine(_baseFolderPath, $"{DateTime.Now:yyyyMMdd}.xlsx");
        }

        /// <summary>
        /// Creates a new Excel template file with the required headers and formatting.
        /// </summary>
        public void CreateExcelTemplate()
        {
            using var workbook = new XLWorkbook();
            var worksheet = workbook.Worksheets.Add("Sheet1");
            worksheet.Cell(1, 1).Value = "Source";
            worksheet.Cell(1, 2).Value = "Date";
            worksheet.Cell(1, 3).Value = "Price";
            worksheet.Cell(1, 4).Value = "Description";
            worksheet.Cell(1, 5).Value = "Used";

            // Header formatting
            var headerRange = worksheet.Range(1, 1, 1, 5);
            headerRange.Style.Font.Bold = true;
            headerRange.Style.Fill.BackgroundColor = XLColor.LightGray;
            headerRange.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

            // Set column widths
            worksheet.Column(1).Width = 15;
            worksheet.Column(2).Width = 12;
            worksheet.Column(3).Width = 10;
            worksheet.Column(4).Width = 40;
            worksheet.Column(5).Width = 8;

            workbook.SaveAs(_templateFilePath);
        }

        /// <summary>
        /// Appends data from all supported folders to the template Excel file.
        /// </summary>
        public string AppendAllFoldersToTemplate()
        {
            string templateFilePath = string.Empty;
            try
            {
                ProcessFolder("0206", "0206");
                ProcessFolder("1944 - Hzone", "1944 - Hzone");
                ProcessFolder("9897", "9897");
                ProcessFolder1224Max();

            }
            finally
            {
                templateFilePath = _templateFilePath;
            }

            return templateFilePath;

        }

        private string EnsureUsedFolderExists(string sourceFolder)
        {
            var usedFolder = Path.Combine(sourceFolder, "USED");
            if (!Directory.Exists(usedFolder))
            {
                Directory.CreateDirectory(usedFolder);
            }
            return usedFolder;
        }

        private void MoveFileToUsed(string filePath, string sourceFolder)
        {
            try
            {
                var usedFolder = EnsureUsedFolderExists(sourceFolder);
                var fileName = Path.GetFileName(filePath);
                var destinationPath = Path.Combine(usedFolder, fileName);

                // If file already exists in USED folder, append timestamp to make it unique
                if (File.Exists(destinationPath))
                {
                    var fileNameWithoutExt = Path.GetFileNameWithoutExtension(fileName);
                    var extension = Path.GetExtension(fileName);
                    fileName = $"{fileNameWithoutExt}_{DateTime.Now:yyyyMMddHHmmss}{extension}";
                    destinationPath = Path.Combine(usedFolder, fileName);
                }

                File.Move(filePath, destinationPath);
                Console.WriteLine($"Moved processed file to: {destinationPath}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error moving file {filePath} to USED folder: {ex.Message}");
            }
        }

        private void ProcessFolder(string folderName, string sourceValue)
        {
            var targetFolder = Path.Combine(_baseFolderPath, folderName);
            if (!Directory.Exists(targetFolder))
            {
                Console.WriteLine($"Folder '{folderName}' does not exist in the path: {_baseFolderPath}");
                return;
            }

            foreach (var filePath in Directory.GetFiles(targetFolder, "*.xlsx"))
            {
                try
                {
                    using var stream = File.Open(filePath, FileMode.Open, FileAccess.Read);
                    using var reader = ExcelReaderFactory.CreateReader(stream);
                    var result = reader.AsDataSet(new ExcelDataSetConfiguration
                    {
                        ConfigureDataTable = _ => new ExcelDataTableConfiguration { UseHeaderRow = false }
                    });
                    var df = result.Tables[0];

                    // Find the starting row where the first column is a date
                    int? startRow = null;
                    for (int i = 0; i < df.Rows.Count; i++)
                    {
                        if (DateTime.TryParse(df.Rows[i][0]?.ToString(), out _))
                        {
                            startRow = i;
                            break;
                        }
                    }
                    if (startRow == null)
                    {
                        Console.WriteLine($"No starting date found in file: {Path.GetFileName(filePath)}");
                        continue;
                    }

                    var newRows = new List<(string Source, DateTime Date, object Price, object Description)>();
                    var dateValue = Convert.ToDateTime(df.Rows[(int)startRow][0]);
                    for (int i = (int)startRow + 1; i < df.Rows.Count; i++)
                    {
                        var row = df.Rows[i];
                        if (row[0] == DBNull.Value || string.IsNullOrWhiteSpace(row[0]?.ToString()))
                            break;
                        var price = row[3] != DBNull.Value ? row[3] : row[2];
                        newRows.Add((sourceValue, dateValue, price, row[1]));
                    }

                    // Close file handle before moving
                    reader.Close();
                    stream.Close();

                    AppendRowsToTemplate(newRows);
                    Console.WriteLine($"Data from {Path.GetFileName(filePath)} appended to template.");
                    
                    // Move file to USED folder after successful processing
                    MoveFileToUsed(filePath, targetFolder);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error processing file {Path.GetFileName(filePath)}: {ex.Message}");
                }
            }
        }

        private void ProcessFolder1224Max()
        {
            var folderName = "1224_max";
            var targetFolder = Path.Combine(_baseFolderPath, folderName);
            if (!Directory.Exists(targetFolder))
            {
                Console.WriteLine($"Folder '{folderName}' does not exist in the path: {_baseFolderPath}");
                return;
            }
            var allRows = new List<(string Source, DateTime? Date, object Description, object Price)>();
            var processedFiles = new List<string>();

            foreach (var filePath in Directory.GetFiles(targetFolder, "*.xlsx"))
            {
                try
                {
                    using var stream = File.Open(filePath, FileMode.Open, FileAccess.Read);
                    using var reader = ExcelReaderFactory.CreateReader(stream);
                    var dataSet = reader.AsDataSet(new ExcelDataSetConfiguration
                    {
                        ConfigureDataTable = _ => new ExcelDataTableConfiguration { UseHeaderRow = false }
                    });
                    foreach (DataTable sheet in dataSet.Tables)
                    {
                        for (int i = 4; i < sheet.Rows.Count; i++)
                        {
                            var row = sheet.Rows[i];
                            var rawDate = row[9];
                            if (rawDate == DBNull.Value || string.IsNullOrWhiteSpace(rawDate?.ToString()))
                                break;
                            DateTime? parsedDate = null;
                            if (DateTime.TryParseExact(rawDate.ToString().Split('.')[0], "dd-MM-yyyy", null, System.Globalization.DateTimeStyles.None, out var dt))
                                parsedDate = dt;
                            var name = row[1];
                            var price = row[5];
                            allRows.Add(("1224_max", parsedDate, name, price));
                        }
                    }

                    // Close file handle before moving
                    reader.Close();
                    stream.Close();

                    Console.WriteLine($"  Finished processing all sheets in {Path.GetFileName(filePath)}.");
                    processedFiles.Add(filePath);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error processing file {Path.GetFileName(filePath)}: {ex.Message}");
                }
            }

            if (allRows.Count > 0)
            {
                AppendRowsToTemplate(allRows.Select(r => (r.Source, r.Date ?? DateTime.MinValue, r.Price, r.Description)).ToList());
                Console.WriteLine($"Successfully appended data from '1224_max' files to {_templateFilePath}.");

                // Move successfully processed files to USED folder
                foreach (var filePath in processedFiles)
                {
                    MoveFileToUsed(filePath, targetFolder);
                }
            }
            else
            {
                Console.WriteLine("No data collected from '1224_max' files to append.");
            }
        }

        private void AppendRowsToTemplate(List<(string Source, DateTime Date, object Price, object Description)> rows)
        {
            using var workbook = File.Exists(_templateFilePath)
                ? new XLWorkbook(_templateFilePath)
                : new XLWorkbook();
            var worksheet = workbook.Worksheets.FirstOrDefault() ?? workbook.Worksheets.Add("Sheet1");
            var lastRow = worksheet.LastRowUsed()?.RowNumber() ?? 1;
            foreach (var row in rows)
            {
                var newRow = worksheet.Row(++lastRow);
                newRow.Cell(1).Value = row.Source;
                newRow.Cell(2).Value = row.Date;
                newRow.Cell(3).Value = row.Price?.ToString() ?? string.Empty;
                newRow.Cell(4).Value = row.Description?.ToString() ?? string.Empty;
                newRow.Cell(5).Value = string.Empty; // Used column
            }
            workbook.SaveAs(_templateFilePath);
        }
    }
}
