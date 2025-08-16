using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartSpender.Web.API.Models;
using SmartSpender.Web.API.Models.Entities;

namespace SmartSpender.Web.API.Controllers
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
