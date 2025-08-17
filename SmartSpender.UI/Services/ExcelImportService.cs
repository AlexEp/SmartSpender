using System;
using System.IO;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using ClosedXML.Excel;
using ExcelDataReader;
using SmartSpender.DAL.BL.Services;
using SmartSpender.DAL.BL.DTOs;

namespace SmartSpender.UI.Services
{
    public class ExcelImportService
    {
        private readonly IRawDataService _rawDataService;

        public ExcelImportService(IRawDataService rawDataService)
        {
            _rawDataService = rawDataService;
        }

        public void CreateExcelTemplate(string filePath)
        {
            using var workbook = new XLWorkbook();
            var worksheet = workbook.Worksheets.Add("Sheet1");
            worksheet.Cell(1, 1).Value = "Source";
            worksheet.Cell(1, 2).Value = "Date";
            worksheet.Cell(1, 3).Value = "Price";
            worksheet.Cell(1, 4).Value = "Description";
            worksheet.Cell(1, 5).Value = "Used";

            var headerRange = worksheet.Range(1, 1, 1, 5);
            headerRange.Style.Font.Bold = true;
            headerRange.Style.Fill.BackgroundColor = XLColor.LightGray;
            headerRange.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

            worksheet.Column(1).Width = 15;
            worksheet.Column(2).Width = 12;
            worksheet.Column(3).Width = 10;
            worksheet.Column(4).Width = 40;
            worksheet.Column(5).Width = 8;

            workbook.SaveAs(filePath);
        }

        public async Task ProcessExcelFile(string filePath)
        {
            using (var stream = File.Open(filePath, FileMode.Open, FileAccess.Read))
            using (var reader = ExcelReaderFactory.CreateReader(stream))
            {
                var result = reader.AsDataSet(new ExcelDataSetConfiguration()
                {
                    ConfigureDataTable = (_) => new ExcelDataTableConfiguration()
                    {
                        UseHeaderRow = true
                    }
                });

                DataTable excelTable = result.Tables[0];
                await InsertDataToSql(excelTable);
            }
        }

        private async Task InsertDataToSql(DataTable excelTable)
        {
            var rawDataDtos = excelTable.AsEnumerable()
                .Skip(1) // Skip header row
                .Select(row => new CreateRawDataDto
                {
                    Source = row["Source"].ToString().Trim(),
                    Description = row["Description"].ToString().Trim(),
                    Price = decimal.Parse(row["Price"].ToString().Trim()),
                    IssueDate = DateTime.Parse(row["Date"].ToString().Trim())
                }).ToList();

            await _rawDataService.CreateRawDataBulkAsync(rawDataDtos);
        }
    }
}
