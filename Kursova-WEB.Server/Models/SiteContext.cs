using Kursova_WEB.Server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Kursova_WEB.Server.Models
{
    public class SiteContext : IdentityDbContext<User, IdentityRole<int>, int>
    {
        public SiteContext(DbContextOptions<SiteContext> options) : base(options) { }

        public virtual DbSet<Survey> Surveys { get; set; }
        public virtual DbSet<Candidate> Candidates { get; set; }
        public virtual DbSet<Vote> Votes { get; set; }

    }
}

