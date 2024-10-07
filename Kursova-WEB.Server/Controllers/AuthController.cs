using Kursova_WEB.Server.Models;
using Kursova_WEB.Server.Models.Requests;
using Kursova_WEB.Server.Models.Responsed;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Kursova_WEB.Server.Controllers
{
    [ApiController]
    //[Route("[controller]")]
    [Route("api/v1/auth")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        public AuthController(UserManager<User> userManager)
        {
            _userManager = userManager;
        }


        private string GenerateJwtToken(User user)
        {
            var jwtHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("my-secret-codemy-secret-codemy-secret-codemy-secret-code");
            var jwtDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                new Claim("Id", user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Role, "User") // for roles
			}),
                //Expires = DateTime.Now.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature),

            };
            var token = jwtHandler.CreateToken(jwtDescriptor);
            var jwtToken = jwtHandler.WriteToken(token);
            return jwtToken;
        }

        [HttpPost]
        [Route("register")]
        public async Task<ApiResponse<AuthResult>> Register([FromBody] RegisterRequest request)
        {
            //await InitRoles();
            if (!ModelState.IsValid)
            {
                Response.StatusCode = 400;
                return ApiResponse<AuthResult>.ErrorResponse("Invalid request");
            }

            // Перевірка на одинакові паролі
            if(request.Password != request.AcceptPassword)
            {
                Response.StatusCode = 400;
                return ApiResponse<AuthResult>.ErrorResponse("Паролі не співпадають");
            }

            // Перевірка на те що такий користувач вже існує
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user != null)
            {
                Response.StatusCode = 400;
                return ApiResponse<AuthResult>.ErrorResponse("Користувач з таким логіном вже існує");
            }

            // Створення користувача
            user = new User
            {
                Email = request.Email,
                UserName = request.Email,
                EmailConfirmed = true,
                
            };

            var result = await _userManager.CreateAsync(user, request.Password);

            await _userManager.AddToRoleAsync(user, "User");


            if (!result.Succeeded)
            {
                Response.StatusCode = 400;
                return ApiResponse<AuthResult>.ErrorResponse("Помилка при створенні користувача");
            }

            return ApiResponse<AuthResult>.SuccessResponse(new AuthResult { Token = GenerateJwtToken(user) });

        }

        [HttpPost]
        [Route("login")]
        public async Task<ApiResponse<AuthResult>> Login([FromBody] LoginRequest request)
        {
            if (!ModelState.IsValid)
            {
                Response.StatusCode = 400;
                return ApiResponse<AuthResult>.ErrorResponse("Invalid request");
            }

            // Перевірка на те що такий користувач вже існує
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null)
            {
                Response.StatusCode = 400;
                return ApiResponse<AuthResult>.ErrorResponse("Користувач не існує");
            }

            // Перевірка пароля
            if (!await _userManager.CheckPasswordAsync(user, request.Password))
            {
                Response.StatusCode = 400;
                return ApiResponse<AuthResult>.ErrorResponse("Пароль невірний");
            }
            var roles = await _userManager.GetRolesAsync(user);

            return ApiResponse<AuthResult>.SuccessResponse(new AuthResult
            {
                Token = GenerateJwtToken(user),
                Roles = roles,
            });
        }
    }
}
