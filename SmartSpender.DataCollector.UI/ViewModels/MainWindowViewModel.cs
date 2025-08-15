using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using my_test.Models;
using my_test.Services;
using System;
using System.IO;
using System.Threading.Tasks;

namespace SmartSpender.DataCollector.UI.ViewModels;

public partial class MainWindowViewModel : ViewModelBase
{
    private readonly IConfiguration _configuration;

    [ObservableProperty]
    private string? _statusMessage;

    public MainWindowViewModel()
    {
        // Build configuration
        _configuration = new ConfigurationBuilder()
            .SetBasePath(Path.Combine(AppContext.BaseDirectory, "..", "..", "..", "..", "SmartSpender.BE"))
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            .Build();
    }

    [RelayCommand]
    private async Task CreateOrUpdateExcelTemplate()
    {
        try
        {
            StatusMessage = "Creating or updating Excel template...";
            await Task.Run(() =>
            {
                var excelDataImporter = new ExcelDataImporter(_configuration);
                excelDataImporter.CreateExcelTemplate();
                excelDataImporter.AppendAllFoldersToTemplate();
            });
            StatusMessage = "Excel template created/updated successfully.";
        }
        catch (Exception ex)
        {
            StatusMessage = $"Error: {ex.Message}";
        }
    }

    [RelayCommand]
    private async Task ProcessExcelFile()
    {
        try
        {
            StatusMessage = "Processing Excel file...";
            await Task.Run(() =>
            {
                var optionsBuilder = new DbContextOptionsBuilder<LlmfinanceContext>();
                optionsBuilder.UseSqlServer(_configuration.GetConnectionString("DefaultConnection"));
                using var context = new LlmfinanceContext(optionsBuilder.Options);
                var templateFilePath = Path.Combine(_configuration.GetValue<string>("Paths:DataFilePath"), "20250812.xlsx");
                var processor = new ExelFileDB(_configuration, context, templateFilePath);
                processor.ProcessExcelFile();
            });
            StatusMessage = "Excel file processed successfully.";
        }
        catch (Exception ex)
        {
            StatusMessage = $"Error: {ex.Message}";
        }
    }

    [RelayCommand]
    private async Task FindAndAddBusinesses()
    {
        try
        {
            StatusMessage = "Finding and adding new businesses...";
            await Task.Run(() =>
            {
                var optionsBuilder = new DbContextOptionsBuilder<LlmfinanceContext>();
                optionsBuilder.UseSqlServer(_configuration.GetConnectionString("DefaultConnection"));
                using var context = new LlmfinanceContext(optionsBuilder.Options);
                var processor = new RawDataToBusinessProcessor(_configuration, context);
                processor.ProcessRawDataToBusiness();
            });
            StatusMessage = "New businesses found and added successfully.";
        }
        catch (Exception ex)
        {
            StatusMessage = $"Error: {ex.Message}";
        }
    }

    [RelayCommand]
    private async Task FindAndAddCategories()
    {
        try
        {
            StatusMessage = "Finding and adding new categories...";
            await Task.Run(() =>
            {
                var optionsBuilder = new DbContextOptionsBuilder<LlmfinanceContext>();
                optionsBuilder.UseSqlServer(_configuration.GetConnectionString("DefaultConnection"));
                using var context = new LlmfinanceContext(optionsBuilder.Options);
                var processor = new BusinessCategoryProcessor(_configuration, context);
                processor.ProcessBusinessCategories();
            });
            StatusMessage = "New categories found and added successfully.";
        }
        catch (Exception ex)
        {
            StatusMessage = $"Error: {ex.Message}";
        }
    }
}
