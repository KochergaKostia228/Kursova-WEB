using System.ComponentModel.DataAnnotations;

namespace Kursova_WEB.Server.Models
{
    public class Vote
    {
        public int Id { get; set; }
        public virtual User User { get; set; }
        public virtual Candidate Candidate { get; set; }
        public virtual Survey Survey { get; set; }
    }
}
