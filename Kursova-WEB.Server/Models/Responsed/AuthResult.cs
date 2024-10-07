namespace Kursova_WEB.Server.Models.Responsed
{
    public class AuthResult
    {
       public string Token { get; set; }
       public IList<string> Roles { get; set; }

    }
}
