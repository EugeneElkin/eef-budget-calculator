using System;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using AutoMapper;
using BudgetCalculationAPI.Services;
using BudgetCalculationAPI.Extensions;
using BudgetCalculationAPI.Services.Interfaces;
using DataWorkShop;
using Microsoft.EntityFrameworkCore;

namespace BudgetCalculationAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<TailoredDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("Service"), b => b.MigrationsAssembly("DataWorkShop")));
            services.AddMvc();
            
            // TODO: check that profiler works;
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            services.AddUserService();
            services.AddTokenService();

            // Configure strongly typed settings objects
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);
            var appSettings = appSettingsSection.Get<AppSettings>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);

            // Configure jwt authentication
            services.AddAuthentication(authOpts =>
            {
                authOpts.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                authOpts.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.Events = new JwtBearerEvents
                {
                    OnTokenValidated = async context =>
                    {
                        var userService = context.HttpContext.RequestServices.GetRequiredService<IUserService>();
                        var userId = context.Principal.Identity.Name;
                        var user = await userService.GetById(userId);
                        if (user == null)
                        {
                            // Return unauthorized if user no longer exists
                            context.Fail("Unauthorized");
                        }
                    }
                };
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    RequireExpirationTime = true,
                    ClockSkew = TimeSpan.Zero // Life time validation doesn't work witout skew
                };
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, AutoMapper.IConfigurationProvider autoMapper)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            autoMapper.AssertConfigurationIsValid();

            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<TailoredDbContext>();

                context.Database.Migrate();
            }

            // Global cors policy
            // TODO: set up to use only with proved hosts
            app.UseCors(x =>
            {
                x.AllowAnyOrigin();
                x.AllowAnyMethod();
                x.AllowAnyHeader();
                x.AllowCredentials();
            });

            app.UseAuthentication();
            app.UseMvc();
        }
    }
}
