using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using System;
using my_test.Models;
using System.Threading.Tasks;
using System.Buffers;
using Microsoft.Identity.Client;
using System.Threading;
using System.Diagnostics;
using System.Threading.Channels;
using my_test.Services;

class Program
{
    static void Main(string[] args)
    {
        try
        {
            // Build configuration
            IConfiguration configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .Build();

            // Create DbContext options
            var optionsBuilder = new DbContextOptionsBuilder<LlmfinanceContext>();
            optionsBuilder.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));

            // Create DbContext
            using (var context = new LlmfinanceContext(optionsBuilder.Options))
            {
                // Ensure database is created
                context.Database.EnsureCreated();
                var FILE_NAME = "LLMFinance.xlsx";
                var templateFilePath = Path.Combine(configuration.GetValue<string>("Paths:DataFilePath"), "20250812.xlsx");
                //ExcelDataImporter excelDataImporter = new ExcelDataImporter(configuration);
                //excelDataImporter.CreateExcelTemplate(); // Create the Excel template file
                //var templateFilePath = excelDataImporter.AppendAllFoldersToTemplate(); // Append data from all EXCEL folders to the template file


                /// 1. Processes the Excel file to RAWDATA table.
                //var processor = new ExelFileDB(configuration, context, templateFilePath);
                //processor.ProcessExcelFile();


                // 2. find and add new busnises if needed.
                //var processor = new RawDataToBusinessProcessor(configuration, context);
                //processor.ProcessRawDataToBusiness();



                // 2. find and add categories and map them to businesses.
                //var processor = new BusinessCategoryProcessor(configuration, context);
                //processor.ProcessBusinessCategories();



            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }

        Console.WriteLine("\nPress any key to exit...");
        Console.ReadKey();
    }


}












