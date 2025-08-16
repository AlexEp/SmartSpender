using SmartSpender.DAL.DTOs;
using SmartSpender.DAL.Repositories;
using SmartSpender.DAL.Models.Entities;

namespace SmartSpender.DAL.Services
{
    public class BusinessService : IBusinessService
    {
        private readonly IRepository<Business> _businessRepository;

        public BusinessService(IRepository<Business> businessRepository)
        {
            _businessRepository = businessRepository;
        }

        public async Task<IEnumerable<BusinessDto>> GetAllBusinessesAsync()
        {
            var businesses = await _businessRepository.GetAllAsync();
            // This is a simple mapping. For more complex scenarios, a library like AutoMapper would be beneficial.
            return businesses.Select(b => new BusinessDto
            {
                BusinessId = b.BusinessId,
                Description = b.Description
            });
        }

        public async Task<BusinessDto?> GetBusinessByIdAsync(int id)
        {
            var business = await _businessRepository.GetByIdAsync(id);
            if (business == null)
            {
                return null;
            }

            return new BusinessDto
            {
                BusinessId = business.BusinessId,
                Description = business.Description
            };
        }
    }
}
