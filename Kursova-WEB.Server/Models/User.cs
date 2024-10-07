using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Kursova_WEB.Server.Models
{
    public class User : IdentityUser<int>
    {
        public User()
        {

        }
        [MaxLength(50)]
        public string? FullName { get; set; }
    }
}
