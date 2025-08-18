using Avalonia;
using Avalonia.Controls.ApplicationLifetimes;
using Avalonia.Controls;
using Avalonia.Platform.Storage;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using SmartSpender.Core.Services;
using SmartSpender.UI.Services;
using System;
using System.Threading.Tasks;

namespace SmartSpender.UI.ViewModels
{
    public partial class MainViewModel : ObservableObject
    {
        private readonly IDataProcessingService _dataProcessingService;
        private readonly ExcelImportService _excelImportService;

        public MainViewModel(IDataProcessingService dataProcessingService, ExcelImportService excelImportService)
        {
            _dataProcessingService = dataProcessingService;
            _excelImportService = excelImportService;

            CreateOrUpdateExcelTemplateCommand = new AsyncRelayCommand(CreateOrUpdateExcelTemplate);
            ProcessExcelToRawDataCommand = new AsyncRelayCommand(ProcessExcelToRawData);
            FindAndAddBusinessesCommand = new AsyncRelayCommand(FindAndAddBusinesses);
            FindAndAddCategoriesCommand = new AsyncRelayCommand(FindAndAddCategories);
        }

        public IAsyncRelayCommand CreateOrUpdateExcelTemplateCommand { get; }
        public IAsyncRelayCommand ProcessExcelToRawDataCommand { get; }
        public IAsyncRelayCommand FindAndAddBusinessesCommand { get; }
        public IAsyncRelayCommand FindAndAddCategoriesCommand { get; }

        private async Task CreateOrUpdateExcelTemplate()
        {
            var topLevel = GetTopLevel();
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
                    _excelImportService.CreateExcelTemplate(file.Path.LocalPath);
                }
            }
        }

        private async Task ProcessExcelToRawData()
        {
            var topLevel = GetTopLevel();
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
                    await _excelImportService.ProcessExcelFile(files[0].Path.LocalPath);
                }
            }
        }

        private async Task FindAndAddBusinesses()
        {
            await _dataProcessingService.ProcessRawDataToBusinessAsync();
        }

        private async Task FindAndAddCategories()
        {
            // The original service hardcoded the path to "BusinessCategory.xlsx".
            // For now, I'll keep this behavior but the path should be configurable.
            // I will assume the file is in the same directory as the executable.
            var topLevel = GetTopLevel();
            if (topLevel != null)
            {
                var files = await topLevel.StorageProvider.OpenFilePickerAsync(new FilePickerOpenOptions
                {
                    Title = "Open Business Category Excel File",
                    AllowMultiple = false,
                    FileTypeFilter = new[] { new FilePickerFileType("Excel Files") { Patterns = new[] { "BusinessCategory.xlsx" } } }
                });

                if (files.Count > 0)
                {
                    await _dataProcessingService.ProcessBusinessCategoriesAsync(files[0].Path.LocalPath);
                }
            }
        }

        private static TopLevel GetTopLevel()
        {
            return (Application.Current?.ApplicationLifetime as IClassicDesktopStyleApplicationLifetime)?.MainWindow;
        }
    }
}
