using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApi.Authentication.Models;
using System.Data.Entity;
using WebApi.Authentication.Entities;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace WebApi.Authentication.Infrastructure
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
            : base("ApplicationDbConnection", throwIfV1Schema: false)
        {
            //Database.CreateIfNotExists();
        }

        public DbSet<Student> Students { get; set; }
        public DbSet<Enrollment> Enrollments { get; set; }
        public DbSet<Course> Courses { get; set; }


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            // User identity authorization
            modelBuilder.Entity<IdentityUserLogin>().HasKey<string>(l => l.UserId);
            modelBuilder.Entity<IdentityRole>().HasKey<string>(r => r.Id);
            modelBuilder.Entity<IdentityUserRole>().HasKey(r => new { r.RoleId, r.UserId });

            // Entity Framework relies on every entity having a key value that it uses for tracking entities.
            // One of the conventions that code first depends on is how it implies which property is the key 
            // in each of the code first classes. That convention is to look for a property named “Id” or 
            // one that combines the class name and “Id”, such as “BlogId”. The property will map 
            // to a primary key column in the database

            // Student
            modelBuilder.Entity<Student>().HasMany(a => a.Enrollments).WithRequired(p => p.Student);

            // Enrollment 
            modelBuilder.Entity<Enrollment>().Property(e => e.CourseID).IsRequired();
            modelBuilder.Entity<Enrollment>().Property(e => e.StudentID).IsRequired();

            // Application user configuration
            modelBuilder.Configurations.Add(new ApplicationUserConfiguration());

            //The modelBuilder.Conventions.Remove statement in the OnModelCreating method prevents 
            // table names from being pluralized. If you didn't do this, the generated tables in the
            // database would be named Students, Courses, and Enrollments. Instead, the table names 
            // will be Student, Course, and Enrollment. Developers disagree about whether table names 
            // should be pluralized or not. This tutorial uses the singular form, but the important point 
            // is that you can select whichever form you prefer by including or omitting this line of code.
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }
}