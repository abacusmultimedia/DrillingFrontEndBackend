using Drillingopt.Persistence.Modles;
using Microsoft.EntityFrameworkCore;

namespace Drillingopt.Persistence.Context
{
    public class DrillingDBContext : DbContext
    {
        public DrillingDBContext(DbContextOptions<DrillingDBContext> options)
            : base(options)
        {
        }

        public DbSet<Events> Events { get; set; }
    }
}

