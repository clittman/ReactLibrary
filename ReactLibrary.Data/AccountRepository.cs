using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactLibrary.Data
{
    public class AccountRepository
    {
        private readonly string _connectionString;

        public AccountRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddUser(User u, string password)
        {
            u.PasswordHash = BCrypt.Net.BCrypt.HashPassword(password);
            LibraryDataContext ctx = new(_connectionString);
            ctx.Users.Add(u);
            ctx.SaveChanges();
        }

        public User Login(string email, string password)
        {
            var user = GetByEmail(email);
            if(user == null)
            {
                return null;
            }
            var validPassword = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
            if (!validPassword)
            {
                return null;
            }
            return user;
        }

        public User GetByEmail(string email)
        {
            LibraryDataContext ctx = new(_connectionString);
            return ctx.Users.Include(u => u.FavoriteBooks).FirstOrDefault(u => u.Email == email);
        }
    }
}
