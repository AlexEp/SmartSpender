using System.Collections.Generic;
using System.Threading.Tasks;
using SmartSpender.Core.DTOs;
using SmartSpender.Core.Services;

namespace SmartSpender.UI.Repositories
{
    public class Repository : IRepository
    {
        private readonly IBusinessService _businessService;
        private readonly ICategoryService _categoryService;

        public Repository(IBusinessService businessService, ICategoryService categoryService)
        {
            _businessService = businessService;
            _categoryService = categoryService;
        }

        public async Task<IEnumerable<BusinessDto>> GetAllBusinessesAsync()
        {
            return await _businessService.GetAllBusinessesAsync();
        }

        public async Task<IEnumerable<CategoryDto>> GetAllCategoriesAsync()
        {
            return await _categoryService.GetAllCategoriesAsync();
        }
    }
}
