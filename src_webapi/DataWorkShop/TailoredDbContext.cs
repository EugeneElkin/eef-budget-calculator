namespace DataWorkShop
{
    using DataWorkShop.Entities;
    using Microsoft.EntityFrameworkCore;

    public class TailoredDbContext : DbContext
    {
        public TailoredDbContext() : base()
        {

        }

        public TailoredDbContext(DbContextOptions options) : base(options)
        {

        }

        public virtual DbSet<Calculation> Calculations { get; set; }
        public virtual DbSet<CalculationItem> CalculationItems { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }
    }
}
