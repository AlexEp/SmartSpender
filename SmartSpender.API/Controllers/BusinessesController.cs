using Microsoft.AspNetCore.Mvc;
using SmartSpender.DAL.DTOs;
using SmartSpender.DAL.Services;

namespace SmartSpender.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BusinessesController : ControllerBase
    {
        private readonly IBusinessService _businessService;

        public BusinessesController(IBusinessService businessService)
        {
            _businessService = businessService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BusinessDto>>> GetBusinesses()
        {
            var businesses = await _businessService.GetAllBusinessesAsync();
            return Ok(businesses);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BusinessDto>> GetBusiness(int id)
        {
            var business = await _businessService.GetBusinessByIdAsync(id);
            if (business == null)
            {
                return NotFound();
            }
            return Ok(business);
        }

        [HttpPost]
        public async Task<ActionResult<BusinessDto>> CreateBusiness(CreateBusinessDto createBusinessDto)
        {
            var createdBusiness = await _businessService.CreateBusinessAsync(createBusinessDto);
            return CreatedAtAction(nameof(GetBusiness), new { id = createdBusiness.BusinessId }, createdBusiness);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBusiness(int id, UpdateBusinessDto updateBusinessDto)
        {
            var result = await _businessService.UpdateBusinessAsync(id, updateBusinessDto);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBusiness(int id)
        {
            var result = await _businessService.DeleteBusinessAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
