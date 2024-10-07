using System.ComponentModel.DataAnnotations;

namespace Kursova_WEB.Server.Models.Requests
{
    public class CandidateRequest
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
