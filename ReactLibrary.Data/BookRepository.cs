using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace ReactLibrary.Data
{
    public class BookRepository
    {
        private readonly string _connectionString;

        public BookRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Book> GetBooks(string text)
        {
            string url = $"http://books-api.lit-projects.com/books/search?query={text}";
            var books = new List<Book>();

            using (var client = new HttpClient())
            {
                var jsonString = client.GetStringAsync(url).Result;

                books = JsonSerializer.Deserialize<List<Book>>(jsonString, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });
            }
            return books;
        }

        public void AddBook(Book b)
        {
            LibraryDataContext ctx = new(_connectionString);
            ctx.Books.Add(b);
            ctx.SaveChanges();
        }

        public void RemoveBook(Book b, int userId)
        {
            if(!CheckBook(b, userId))
            {
                return;
            };
            LibraryDataContext ctx = new(_connectionString);
            ctx.Database.ExecuteSqlInterpolated($"DELETE FROM Books WHERE Id = {b.Id}");
        }

        public List<Book> GetFavoriteBooks(int id)
        {
            LibraryDataContext ctx = new(_connectionString);
            return ctx.Books.Where(b => b.UserId == id).ToList();
        }

        public void AddNote(Book b, int userId)
        {
            if (!CheckBook(b, userId))
            {
                return;
            };
            LibraryDataContext ctx = new(_connectionString);
            ctx.Database.ExecuteSqlInterpolated($"UPDATE Books SET Notes = {b.Notes} WHERE Id = {b.Id}");
        }

        public bool CheckBook(Book b, int userId)
        {
            LibraryDataContext ctx = new(_connectionString);
            Book book = ctx.Books.FirstOrDefault(bo => bo.OpenLibraryId == b.OpenLibraryId);
            if (book == null || book.UserId != userId)
            {
                return false;
            }
            return true;
        }
    }
}
