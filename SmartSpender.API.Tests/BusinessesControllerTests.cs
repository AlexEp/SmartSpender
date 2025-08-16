using Microsoft.EntityFrameworkCore;
using SmartSpender.Web.API.Controllers;
using SmartSpender.Web.API.Models;
using SmartSpender.Web.API.Models.Entities;
using Xunit;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace SmartSpender.Web.API.Tests
{
    public class BusinessesControllerTests
    {
        [Fact]
        public async Task GetBusinesses_ReturnsAllBusinesses()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<LlmfinanceContext>()
                .UseInMemoryDatabase(databaseName: "BusinessesTest")
                .Options;

            // Seed the database
            using (var context = new LlmfinanceContext(options))
            {
                context.Businesses.Add(new Business { BusinessId = 1, Description = "Test Business 1" });
                context.Businesses.Add(new Business { BusinessId = 2, Description = "Test Business 2" });
                context.SaveChanges();
            }

            // Act
            using (var context = new LlmfinanceContext(options))
            {
                var controller = new BusinessesController(context);
                var result = await controller.GetBusinesses();

                // Assert
                var actionResult = Assert.IsType<ActionResult<IEnumerable<Business>>>(result);
                var model = Assert.IsAssignableFrom<IEnumerable<Business>>(actionResult.Value);
                Assert.Equal(2, model.Count());
            }
        }
    }
}
