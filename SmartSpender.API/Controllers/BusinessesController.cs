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
    }
}
