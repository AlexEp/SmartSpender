using System;
using System.IO;
using System.Data;
using System.Linq;
using ExcelDataReader;
using Microsoft.Extensions.Configuration;
using SmartSpender.UI.Models;
using SmartSpender.UI.Models.Entities;

public class BusinessCategoryProcessor
{
    private readonly IConfiguration _configuration;
    private readonly string _excelFilePath;
    private readonly LlmfinanceContext _context;

    /// <summary>
    /// Initializes a new instance of the <see cref="BusinessCategoryProcessor"/> class.
    /// </summary>
    /// <param name="configuration">The application configuration.</param>
    /// <param name="context">The database context.</param>
    public BusinessCategoryProcessor(IConfiguration configuration, LlmfinanceContext context)
    {
        _configuration = configuration;
        _context = context;
        _excelFilePath = Path.Combine(
            _configuration["Paths:DataFilePath"],
            "BusinessCategory.xlsx"
        );
    }

    /// <summary>
    /// Processes the business categories from the Excel file and updates the database.
    /// </summary>
    public void ProcessBusinessCategories()
    {
        // Register encoding provider for ExcelDataReader
        System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);

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

            DataTable dataTable = result.Tables[0];

            // Skip the header row and process until empty row
            for (int row = 0; row < dataTable.Rows.Count; row++)
            {
                DataRow dataRow = dataTable.Rows[row];

                // Check if row is empty
                if (string.IsNullOrWhiteSpace(dataRow[0].ToString()) &&
                    string.IsNullOrWhiteSpace(dataRow[1].ToString()))
                {
                    break;
                }

                string businessName = dataRow[0].ToString().Trim();
                string categoryName = dataRow[1].ToString().Trim();

                // Get or create Business
                var business = _context.Businesses
                    .FirstOrDefault(b => b.Description == businessName);
                if (business == null)
                {
                    business = new Business { Description = businessName };
                    _context.Businesses.Add(business);
                    _context.SaveChanges(); // Save to get the ID
                }
                try
                {
                    // Get or create Category
                    var category = _context.Categories
                    .FirstOrDefault(c => c.CategoryName == categoryName);
                    if (category == null)
                    {
                        category = new Category { CategoryName = categoryName };
                        _context.Categories.Add(category);
                        _context.SaveChanges(); // Save to get the ID
                    }

                    // Create relationship if it doesn't exist
                    var exists = _context.BusinessCategories
                        .Any(bc => bc.BusinessId == business.BusinessId && bc.CategoryId == category.CategoryId);

                    if (!exists)
                    {
                        var businessCategory = new BusinessCategory
                        {
                            BusinessId = business.BusinessId,
                            CategoryId = category.CategoryId
                        };
                        _context.BusinessCategories.Add(businessCategory);
                        Console.WriteLine($"Added mapping: Business: {businessName}, Category: {categoryName}");
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                }
            }

            // Save all changes to database
            _context.SaveChanges();
        }
    }
}
