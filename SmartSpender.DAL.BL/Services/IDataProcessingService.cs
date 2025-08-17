namespace SmartSpender.DAL.BL.Services
{
    public interface IDataProcessingService
    {
        Task ProcessRawDataToBusinessAsync();
        Task ProcessBusinessCategoriesAsync(string excelFilePath);
    }
}
