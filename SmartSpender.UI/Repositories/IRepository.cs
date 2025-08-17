using System.Collections.Generic;
using System.Threading.Tasks;
using SmartSpender.DAL.BL.DTOs;

namespace SmartSpender.UI.Repositories
{
    public interface IRepository
    {
        Task<IEnumerable<BusinessDto>> GetAllBusinessesAsync();
        Task<IEnumerable<CategoryDto>> GetAllCategoriesAsync();
    }
}
