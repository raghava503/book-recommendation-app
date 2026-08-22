using Microsoft.EntityFrameworkCore;
using BookRecommendationApi.Models;

namespace BookRecommendationApi.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Book> Books { get; set; }
    public DbSet<User> Users { get; set; }  // ✅ Ensure this exists

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Seed books
        modelBuilder.Entity<Book>().HasData(
            new Book { Id = 1, Title = "The Hobbit", Author = "J.R.R. Tolkien", Genre = "Fantasy", Rating = 5, IsRecommended = true },
            new Book { Id = 2, Title = "Dune", Author = "Frank Herbert", Genre = "Sci-Fi", Rating = 4, IsRecommended = true },
            new Book { Id = 3, Title = "1984", Author = "George Orwell", Genre = "Dystopian", Rating = 5, IsRecommended = true },
            new Book { Id = 4, Title = "The Shining", Author = "Stephen King", Genre = "Horror", Rating = 4, IsRecommended = true }
        );

        // Seed a test user
        modelBuilder.Entity<User>().HasData(
            new User
            {
                Id = 1,
                Username = "admin",
                PasswordHash = "AQAAAAIAAYagAAAAEPrlKkXxI0zVj6vG/5Hh9g/3aJkLmNpQrStUvWxYzZ1aB2cD3eF4gH5iJ6kL7mN8oP9qR0s=",
                Role = "Admin"
            }
        );
    }
}