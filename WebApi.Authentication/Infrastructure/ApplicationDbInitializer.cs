using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Diagnostics;
using System.Linq;
using System.Web;
using WebApi.Authentication.Entities;

namespace WebApi.Authentication.Infrastructure
{
    public class ApplicationDbInitializer : DropCreateDatabaseIfModelChanges<ApplicationDbContext>
    {
        protected override void Seed(ApplicationDbContext context)
        {
            try
            {
                GetStudents().ForEach(c => context.Students.Add(c));
                GetCourses().ForEach(p => context.Courses.Add(p));
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Message);
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        private static List<Student> GetStudents()
        {
            return new List<Student>
            {
                new Student{FirstMidName="Carson",LastName="Alexander",EnrollmentDate=DateTime.Parse("2005-09-01")},
                new Student{FirstMidName="Meredith",LastName="Alonso",EnrollmentDate=DateTime.Parse("2002-09-01")},
                new Student{FirstMidName="Arturo",LastName="Anand",EnrollmentDate=DateTime.Parse("2003-09-01")},
                new Student{FirstMidName="Gytis",LastName="Barzdukas",EnrollmentDate=DateTime.Parse("2002-09-01")},
                new Student{FirstMidName="Yan",LastName="Li",EnrollmentDate=DateTime.Parse("2002-09-01")},
                new Student{FirstMidName="Peggy",LastName="Justice",EnrollmentDate=DateTime.Parse("2001-09-01")},
                new Student{FirstMidName="Laura",LastName="Norman",EnrollmentDate=DateTime.Parse("2003-09-01")},
                new Student{FirstMidName="Nino",LastName="Olivetto",EnrollmentDate=DateTime.Parse("2005-09-01")}
            };
        }


        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        private static List<Course> GetCourses()
        {
            return new List<Course>
            {
                new Course{Id=1050,Title="Chemistry",Credits=3,},
                new Course{Id=4022,Title="Microeconomics",Credits=3,},
                new Course{Id=4041,Title="Macroeconomics",Credits=3,},
                new Course{Id=1045,Title="Calculus",Credits=4,},
                new Course{Id=3141,Title="Trigonometry",Credits=4,},
                new Course{Id=2021,Title="Composition",Credits=3,},
                new Course{Id=2042,Title="Literature",Credits=4,}
            };
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        private static List<Enrollment> GetEnrollments()
        {
            return new List<Enrollment>
            {
               new Enrollment{StudentID=1,CourseID=1050,Grade=Grade.A},
               new Enrollment{StudentID=1,CourseID=4022,Grade=Grade.C},
               new Enrollment{StudentID=1,CourseID=4041,Grade=Grade.B},
               new Enrollment{StudentID=2,CourseID=1045,Grade=Grade.B},
               new Enrollment{StudentID=2,CourseID=3141,Grade=Grade.F},
               new Enrollment{StudentID=2,CourseID=2021,Grade=Grade.F},
               new Enrollment{StudentID=3,CourseID=1050},
               new Enrollment{StudentID=4,CourseID=1050,},
               new Enrollment{StudentID=4,CourseID=4022,Grade=Grade.F},
               new Enrollment{StudentID=5,CourseID=4041,Grade=Grade.C},
               new Enrollment{StudentID=6,CourseID=1045},
               new Enrollment{StudentID=7,CourseID=3141,Grade=Grade.A},
            };
        }
    }
}