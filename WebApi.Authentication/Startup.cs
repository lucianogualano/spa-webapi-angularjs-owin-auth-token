using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.Owin;
using Owin;
using System.Web.Http;
using System.Data.Entity;
using WebApi.Authentication.Infrastructure;

[assembly: OwinStartup(typeof(WebApi.Authentication.Startup))]

namespace WebApi.Authentication
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);

            // Init database
            Database.SetInitializer(new ApplicationDbInitializer());
        }
    }
}