using System;
using System.Linq;
using Microsoft.Extensions.Configuration;
using my_test.Models;
using my_test.Models.Entities;

public class RawDataToBusinessProcessor
{
    private readonly IConfiguration _configuration;
    private readonly LlmfinanceContext _context;

    /// <summary>
    /// Initializes a new instance of the <see cref="RawDataToBusinessProcessor"/> class.
    /// </summary>
    /// <param name="configuration">The application configuration.</param>
    /// <param name="context">The database context.</param>
    public RawDataToBusinessProcessor(IConfiguration configuration, LlmfinanceContext context)
    {
        _configuration = configuration;
        _context = context;
    }

    /// <summary>
    /// Processes the RAW_DATA table and adds descriptions as businesses to the Business table if they do not already exist.
    /// </summary>
    public void ProcessRawDataToBusiness()
    {
        // Retrieve all descriptions from RAW_DATA
        var rawDataDescriptions = _context.RawData
            .Select(rd => rd.Description)
            .Where(description => !string.IsNullOrWhiteSpace(description))
            .Distinct()
            .ToList();

        // Retrieve existing business descriptions
        var existingBusinessDescriptions = _context.Businesses
            .Select(b => b.Description)
            .ToHashSet();

        foreach (var description in rawDataDescriptions)
        {
            // Check if the description already exists in the Business table
            if (!existingBusinessDescriptions.Contains(description))
            {
                // Add the new business
                var newBusiness = new Business
                {
                    Description = description
                };

                _context.Businesses.Add(newBusiness);
                Console.WriteLine($"Added new business: {description}");
            }
        }

        // Save all changes to the database
        _context.SaveChanges();
    }
}
