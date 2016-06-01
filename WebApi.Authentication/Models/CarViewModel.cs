using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Authentication.Models
{
    public enum TransmissionType
    {
        Automatic,
        Manual
    }

    public class CarViewModel
    {
        public string Make { get; set; }
        public string Model { get; set; }
        public string Year { get; set; }
        public TransmissionType Transmission { get; set; }
    }
}