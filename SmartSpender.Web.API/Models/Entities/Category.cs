using System;
using System.Collections.Generic;

namespace SmartSpender.Web.API.Models.Entities;

public partial class Category
{
    public int CategoryId { get; set; }

    public string? CategoryName { get; set; }
}
