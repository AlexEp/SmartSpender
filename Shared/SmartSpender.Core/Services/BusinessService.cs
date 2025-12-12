using SmartSpender.Core.DTOs;
using SmartSpender.Core.Interfaces;
using SmartSpender.Core.Models.Entities;

namespace SmartSpender.Core.Services
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

        public async Task<BusinessDto> CreateBusinessAsync(CreateBusinessDto createBusinessDto)
        {
            var business = new Business
            {
                Description = createBusinessDto.Description
            };

            await _businessRepository.AddAsync(business);
            await _businessRepository.SaveChangesAsync();

            return new BusinessDto
            {
                BusinessId = business.BusinessId,
                Description = business.Description
            };
        }

        public async Task<bool> UpdateBusinessAsync(int id, UpdateBusinessDto updateBusinessDto)
        {
            var business = await _businessRepository.GetByIdAsync(id);
            if (business == null)
            {
                return false;
            }

            business.Description = updateBusinessDto.Description;
            _businessRepository.Update(business);
            await _businessRepository.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteBusinessAsync(int id)
        {
            var business = await _businessRepository.GetByIdAsync(id);
            if (business == null)
            {
                return false;
            }

            _businessRepository.Delete(business);
            await _businessRepository.SaveChangesAsync();

            return true;
        }
    }
}
