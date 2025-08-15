using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartSpender.API.Models;
using SmartSpender.API.Models.Entities;

namespace SmartSpender.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BusinessesController : ControllerBase
    {
        private readonly LlmfinanceContext _context;

        public BusinessesController(LlmfinanceContext context)
        {
            _context = context;
        }

        // GET: api/businesses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Business>>> GetBusinesses()
        {
            return await _context.Businesses.ToListAsync();
        }
    }
}
