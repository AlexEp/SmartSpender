using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using ExcelDataReader;
using Microsoft.Extensions.Configuration;
using SmartSpender.UI.Models;
using ClosedXML.Excel;

namespace SmartSpender.UI.Services
{
    /// <summary>
    /// Service for creating and appending data to an Excel template file from multiple source folders.
    /// </summary>
    public class ExcelDataImporter
    {
        private readonly IConfiguration _configuration;
        private readonly string _baseFolderPath;
        public ExcelDataImporter(IConfiguration configuration)
        {
            _configuration = configuration;
            _baseFolderPath = _configuration["Paths:DataFilePath"];
        }

        /// <summary>
        /// Creates a new Excel template file with the required headers and formatting.
        /// </summary>
        public void CreateExcelTemplate(string filePath)
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

            workbook.SaveAs(filePath);
        }

    }
}
