using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactLibrary.Data;
using ReactLibrary.Web.Models;
using System.Security.Claims;

namespace ReactLibrary.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly string _connectionString;

        public BookController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("search")]
        public List<Book> GetBooks(string searchText)
        {
            BookRepository repo = new(_connectionString);
            return repo.GetBooks(searchText);
        }

        [Authorize]
        [HttpPost("addbook")]
        public void AddBook(Book b)
        {
            var user = GetUser();
            if(user == null)
            {
                return;
            }
            b.UserId = user.Id;
            BookRepository repo = new(_connectionString);
            repo.AddBook(b);
        }

        [Authorize]
        [HttpPost("removebook")]
        public void RemoveBook(Book b)
        {
            var user = GetUser();
            if (user == null)
            {
                return;
            }
            b.UserId = user.Id;
            BookRepository repo = new(_connectionString);
            repo.RemoveBook(b, user.Id);
        }

        [Authorize]
        [Route("getfavbooks")]
        public List<Book> GetFavoriteBooks()
        {
            var user = GetUser();
            if (user == null)
            {
                return null;
            }
            BookRepository repo = new(_connectionString);
            return repo.GetFavoriteBooks(user.Id);
        }

        [Authorize]
        [Route("addnote")]
        public void AddNote(Book b)
        {
            var user = GetUser();
            if (user == null)
            {
                return;
            }
            BookRepository repo = new(_connectionString);
            repo.AddNote(b, user.Id);
        }

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
