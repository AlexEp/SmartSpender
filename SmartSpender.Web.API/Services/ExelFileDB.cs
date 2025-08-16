using System;
using System.IO;
using System.Data;
using System.Linq;
using ExcelDataReader;
using Microsoft.Extensions.Configuration;
using SmartSpender.Web.API.Models;
using SmartSpender.Web.API.Models.Entities;
using Microsoft.IdentityModel.Tokens;

namespace SmartSpender.Web.API.Services;

public class ExelFileDB
{
    const string FILE_NAME = "20250506.xlsx";

    private readonly IConfiguration _configuration;
    private readonly string _excelFilePath;
    private readonly LlmfinanceContext _context;

    /// <summary>
    /// Initializes a new instance of the <see cref="ExelFileDB"/> class.
    /// </summary>
    /// <param name="configuration">The application configuration.</param>
    /// <param name="context">The database context.</param>
    public ExelFileDB(IConfiguration configuration, LlmfinanceContext context,string templateFilePath)
    {
        _configuration = configuration;
        _context = context;
        _excelFilePath = string.IsNullOrEmpty(templateFilePath) ? Path.Combine(
            _configuration.GetValue<string>("Paths:DataFilePath"),FILE_NAME ) : templateFilePath;
    }

    /// <summary>
    /// Processes the Excel Summery file and inserts data into the database RAWDATA.
    /// </summary>
    public void ProcessExcelFile()
    {
        using (var stream = File.Open(_excelFilePath, FileMode.Open, FileAccess.Read))
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

            InsertDataToSql(excelTable);
        }
    }

    /// <summary>
    /// Inserts data from the DataTable into the database, checking for duplicates.
    /// </summary>
    /// <param name="excelTable">The DataTable containing the Excel data.</param>
    private void InsertDataToSql(DataTable excelTable)
    {
        var alreadyExist = _context.RawData.ToArray();

        // Skip the header row and process each row
        for (int row = 1; row < excelTable.Rows.Count; row++)
        {
            DataRow dataRow = excelTable.Rows[row];

            // Extract data from each column
            string source = dataRow["Source"].ToString().Trim();
            string description = dataRow["Description"].ToString().Trim();
            decimal price = decimal.Parse(dataRow["Price"].ToString().Trim());
            DateTime issueDate = DateTime.Parse(dataRow["Date"].ToString().Trim());

            // Check if the data already exists in the database
            bool exists = alreadyExist.Any(rd =>
                rd.Source == source &&
                rd.Description == description &&
                rd.Price == price &&
                rd.IssueDate == issueDate);

            bool exists2 = alreadyExist.Any(rd =>
              rd.Source == source &&
         
              rd.Price == price
             );


            if (!exists)
            {
                // Create a new RawDatum object
                var rawDatum = new RawDatum
                {
                    Source = source,
                    Description = description,
                    Price = price,
                    IssueDate = issueDate,
                };

                // Add the new object to the context
                _context.RawData.Add(rawDatum);
            }
        }

        // Save all changes to the database
        _context.SaveChanges();
    }
}
