using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ReactLibrary.Data;
using ReactLibrary.Web.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ReactLibrary.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly string _connectionString;
        private IConfiguration _configuration;

        public AccountController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
            _configuration = configuration;
        }

        [HttpPost("adduser")]
        public void AddUser(AddUserViewModel vm)
        {
            AccountRepository repo = new(_connectionString);
            repo.AddUser(vm.User, vm.Password);
        }

        [HttpPost("login")]
        public IActionResult Login(LoginViewModel vm)
        {
            var repo = new AccountRepository(_connectionString);
            var user = repo.Login(vm.Email, vm.Password);
            if (user == null)
            {
                return Unauthorized();
            }

            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Email, vm.Email)
            };

            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("JWTSecret")));
            var credentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokenOptions = new JwtSecurityToken(signingCredentials: credentials,
                claims: claims);
            string tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            return Ok(new { token = tokenString });
        }

        [Route("getcurrentuser")]
        public User GetUser()
        {
            string email = User.FindFirst(ClaimTypes.Email)?.Value; 
            if (String.IsNullOrEmpty(email))
            {
                return null;
            }

            var repo = new AccountRepository(_connectionString);
            return repo.GetByEmail(email);
        }
    }
}
