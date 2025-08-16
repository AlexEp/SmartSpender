using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using SmartSpender.UI.Services;
using System.Threading.Tasks;
using Avalonia.Platform.Storage;
using System;
using Avalonia.Controls.ApplicationLifetimes;
using Avalonia;
using Microsoft.Extensions.Configuration;
using System.IO;
using SmartSpender.UI.Models;
using Microsoft.EntityFrameworkCore;

namespace SmartSpender.UI.ViewModels
{
    public partial class MainViewModel : ObservableObject
    {
        private readonly ExcelDataImporter _excelDataImporter;
        private readonly ExelFileDB _exelFileDB;
        private readonly RawDataToBusinessProcessor _rawDataToBusinessProcessor;
        private readonly BusinessCategoryProcessor _businessCategoryProcessor;

        public MainViewModel()
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .Build();

            var optionsBuilder = new DbContextOptionsBuilder<LlmfinanceContext>();
            optionsBuilder.UseSqlite(configuration.GetConnectionString("DefaultConnection"));

            var context = new LlmfinanceContext(optionsBuilder.Options);
            context.Database.EnsureCreated();

            _excelDataImporter = new ExcelDataImporter(configuration);
            _exelFileDB = new ExelFileDB(configuration, context);
            _rawDataToBusinessProcessor = new RawDataToBusinessProcessor(configuration, context);
            _businessCategoryProcessor = new BusinessCategoryProcessor(configuration, context);

            CreateOrUpdateExcelTemplateCommand = new AsyncRelayCommand(CreateOrUpdateExcelTemplate);
            ProcessExcelToRawDataCommand = new AsyncRelayCommand(ProcessExcelToRawData);
            FindAndAddBusinessesCommand = new RelayCommand(FindAndAddBusinesses);
            FindAndAddCategoriesCommand = new RelayCommand(FindAndAddCategories);
        }

        public IAsyncRelayCommand CreateOrUpdateExcelTemplateCommand { get; }
        public IAsyncRelayCommand ProcessExcelToRawDataCommand { get; }
        public IRelayCommand FindAndAddBusinessesCommand { get; }
        public IRelayCommand FindAndAddCategoriesCommand { get; }

        private async Task CreateOrUpdateExcelTemplate()
        {
            var topLevel = (Application.Current.ApplicationLifetime as IClassicDesktopStyleApplicationLifetime)?.MainWindow;
            if (topLevel != null)
            {
                var file = await topLevel.StorageProvider.SaveFilePickerAsync(new FilePickerSaveOptions
                {
                    Title = "Save Excel Template",
                    DefaultExtension = "xlsx",
                    ShowOverwritePrompt = true
                });

                if (file != null)
                {
                    _excelDataImporter.CreateExcelTemplate(file.Path.LocalPath);
                }
            }
        }

        private async Task ProcessExcelToRawData()
        {
            var topLevel = (Application.Current.ApplicationLifetime as IClassicDesktopStyleApplicationLifetime)?.MainWindow;
            if (topLevel != null)
            {
                var files = await topLevel.StorageProvider.OpenFilePickerAsync(new FilePickerOpenOptions
                {
                    Title = "Open Excel File",
                    AllowMultiple = false,
                    FileTypeFilter = new[] { new FilePickerFileType("Excel Files") { Patterns = new[] { "*.xlsx", "*.xls" } } }
                });

                if (files.Count > 0)
                {
                    _exelFileDB.ProcessExcelFile(files[0].Path.LocalPath);
                }
            }
        }

        private void FindAndAddBusinesses()
        {
            _rawDataToBusinessProcessor.ProcessRawDataToBusiness();
        }

        private void FindAndAddCategories()
        {
            _businessCategoryProcessor.ProcessBusinessCategories();
        }
    }
}
