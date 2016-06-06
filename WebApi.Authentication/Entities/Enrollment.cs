using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Authentication.Entities
{
    public enum Grade
    {
        A, B, C, D, F
    }

    public class Enrollment : IEntityBase
    {
        public int Id { get; set; }
        public Grade? Grade { get; set; }

        public int CourseID { get; set; }
        public virtual Course Course { get; set; }

        public int StudentID { get; set; }
        public virtual Student Student { get; set; }
    }
}