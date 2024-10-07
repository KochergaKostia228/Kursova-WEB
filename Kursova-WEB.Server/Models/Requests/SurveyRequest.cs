using System.ComponentModel.DataAnnotations;

namespace Kursova_WEB.Server.Models.Requests
{
    public class SurveyRequest
    {
        public string Name { get; set; }
        public string Description { get; set; }

        public DateTime StartDate {  get => DateTime.Now; }

        public DateTime EndDate { get; set; }

        public List<Candidate>? Candidates { get; set; }

    }
}
