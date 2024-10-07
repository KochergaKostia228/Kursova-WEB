using System.ComponentModel.DataAnnotations;

namespace Kursova_WEB.Server.Models
{
    public class Survey
    {
        public Survey() {
            Candidates = new List<Candidate>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        public SurveyStatus Status { get; set; }  

        public virtual ICollection<Candidate>? Candidates { get; set; }

    }
}
