using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ExcelDataReader;
using SmartSpender.DAL.BL.Models.Entities;
using SmartSpender.DAL.BL.Repositories;

namespace SmartSpender.DAL.BL.Services
{
    public class DataProcessingService : IDataProcessingService
    {
        private readonly IRepository<RawData> _rawDataRepo;
        private readonly IRepository<Business> _businessRepo;
        private readonly IRepository<Category> _categoryRepo;
        private readonly IRepository<BusinessCategory> _businessCategoryRepo;

        public DataProcessingService(
            IRepository<RawData> rawDataRepo,
            IRepository<Business> businessRepo,
            IRepository<Category> categoryRepo,
            IRepository<BusinessCategory> businessCategoryRepo)
        {
            _rawDataRepo = rawDataRepo;
            _businessRepo = businessRepo;
            _categoryRepo = categoryRepo;
            _businessCategoryRepo = businessCategoryRepo;
        }

        public async Task ProcessRawDataToBusinessAsync()
        {
            var rawDataDescriptions = (await _rawDataRepo.GetAllAsync())
                .Select(rd => rd.Description)
                .Where(description => !string.IsNullOrWhiteSpace(description))
                .Distinct()
                .ToList();

            var existingBusinessDescriptions = (await _businessRepo.GetAllAsync())
                .Select(b => b.Description)
                .ToHashSet();

            foreach (var description in rawDataDescriptions)
            {
                if (!existingBusinessDescriptions.Contains(description))
                {
                    var newBusiness = new Business
                    {
                        Description = description
                    };
                    await _businessRepo.AddAsync(newBusiness);
                }
            }
            await _businessRepo.SaveChangesAsync();
        }

        public async Task ProcessBusinessCategoriesAsync(string excelFilePath)
        {
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);

            using (var stream = File.Open(excelFilePath, FileMode.Open, FileAccess.Read))
            using (var reader = ExcelReaderFactory.CreateReader(stream))
            {
                var result = reader.AsDataSet(new ExcelDataSetConfiguration()
                {
                    ConfigureDataTable = (_) => new ExcelDataTableConfiguration()
                    {
                        UseHeaderRow = true
                    }
                });

                var dataTable = result.Tables[0];

                for (int row = 0; row < dataTable.Rows.Count; row++)
                {
                    var dataRow = dataTable.Rows[row];

                    if (string.IsNullOrWhiteSpace(dataRow[0].ToString()) &&
                        string.IsNullOrWhiteSpace(dataRow[1].ToString()))
                    {
                        break;
                    }

                    string businessName = dataRow[0].ToString().Trim();
                    string categoryName = dataRow[1].ToString().Trim();

                    var business = (await _businessRepo.FindAsync(b => b.Description == businessName)).FirstOrDefault();
                    if (business == null)
                    {
                        business = new Business { Description = businessName };
                        await _businessRepo.AddAsync(business);
                        await _businessRepo.SaveChangesAsync();
                    }

                    var category = (await _categoryRepo.FindAsync(c => c.CategoryName == categoryName)).FirstOrDefault();
                    if (category == null)
                    {
                        category = new Category { CategoryName = categoryName };
                        await _categoryRepo.AddAsync(category);
                        await _categoryRepo.SaveChangesAsync();
                    }

                    var exists = (await _businessCategoryRepo.FindAsync(bc => bc.BusinessId == business.BusinessId && bc.CategoryId == category.CategoryId)).Any();
                    if (!exists)
                    {
                        var businessCategory = new BusinessCategory
                        {
                            BusinessId = business.BusinessId,
                            CategoryId = category.CategoryId
                        };
                        await _businessCategoryRepo.AddAsync(businessCategory);
                    }
                }
                await _businessCategoryRepo.SaveChangesAsync();
            }
        }
    }
}
