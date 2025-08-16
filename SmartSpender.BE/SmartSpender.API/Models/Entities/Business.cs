using System;
using System.Collections.Generic;

namespace SmartSpender.API.Models.Entities;

public partial class Business
{
    public int BusinessId { get; set; }

    public string? Description { get; set; }
}
