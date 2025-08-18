using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SmartSpender.Core;
using SmartSpender.Core.Services;
using SmartSpender.DAL.BL;
using System;
using System.IO;
using System.Threading.Tasks;

namespace SmartSpender.DataCollector
{
    class Program
    {
        static async Task Main(string[] args)
        {
            try
            {
                // Build configuration
                IConfiguration configuration = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                    .Build();

                // Set up dependency injection
                var serviceCollection = new ServiceCollection();
                ConfigureServices(serviceCollection, configuration);
                var serviceProvider = serviceCollection.BuildServiceProvider();

                // Resolve the data processing service
                var dataProcessingService = serviceProvider.GetRequiredService<IDataProcessingService>();

                // 1. Process raw data to businesses
                Console.WriteLine("Processing raw data to businesses...");
                await dataProcessingService.ProcessRawDataToBusinessAsync();
                Console.WriteLine("Finished processing raw data to businesses.");

                // 2. Process business categories
                Console.WriteLine("Processing business categories...");
                var businessCategoryFilePath = Path.Combine(
                    configuration.GetValue<string>("Paths:DataFilePath"),
                    "BusinessCategory.xlsx"
                );
                await dataProcessingService.ProcessBusinessCategoriesAsync(businessCategoryFilePath);
                Console.WriteLine("Finished processing business categories.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }

            Console.WriteLine("\nPress any key to exit...");
            Console.ReadKey();
        }

        private static void ConfigureServices(IServiceCollection services, IConfiguration configuration)
        {
            services.AddDalServices(configuration);
            services.AddCoreServices();
        }
    }
}
