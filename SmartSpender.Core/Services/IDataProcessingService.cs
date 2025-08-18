namespace SmartSpender.Core.Services
{
    public interface IDataProcessingService
    {
        Task ProcessRawDataToBusinessAsync();
        Task ProcessBusinessCategoriesAsync(string excelFilePath);
    }
}
