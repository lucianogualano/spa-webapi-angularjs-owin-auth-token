using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Authentication.Models
{
    public class StudentViewModel
    {
        // By default, the Entity Framework interprets a property that's named ID or classnameID as the primary key.        
        public int Id { get; set; }
        public string LastName { get; set; }
        public string FirstMidName { get; set; }
        public DateTime EnrollmentDate { get; set; }

        // Enrollments property of a Student entity will hold all of the Enrollment entities that are
        // related to that Student entity. In other words, if a given Student row in the database has 
        // two related Enrollment rows(rows that contain that student's primary key value in 
        // their StudentID foreign key column), that Student entity's Enrollments navigation
        // property will contain those two Enrollment entities.
        public virtual ICollection<EnrollmentViewModel> Enrollments { get; set; }
    }
}