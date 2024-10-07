using System.ComponentModel.DataAnnotations.Schema;

namespace Kursova_WEB.Server.Models
{
    public class Candidate
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Votes { get; set; }
    }
}
