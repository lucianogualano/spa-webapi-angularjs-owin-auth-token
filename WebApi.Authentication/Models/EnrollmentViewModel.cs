using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApi.Authentication.Entities;

namespace WebApi.Authentication.Models
{
    public class EnrollmentViewModel
    {
        public int Id { get; set; }
        public Grade? Grade { get; set; }

        public int CourseID { get; set; }
        public CourseViewModel Course { get; set; }
    }
}