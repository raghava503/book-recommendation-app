using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookRecommendationApi.Models;
using BookRecommendationApi.Data;

namespace BookRecommendationApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<BooksController> _logger;

        public BooksController(ApplicationDbContext context, ILogger<BooksController> logger)
        {
            _context = context;
            _logger = logger;
        }
       

        // GET: api/books - Public access (no authentication required)
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllBooks()
        {
            var books = await _context.Books.ToListAsync();
            return Ok(books);
        }

        // GET: api/books/{id} - Public access (no authentication required)
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetBookById(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound(new { message = $"Book with ID {id} not found." });
            }
            return Ok(book);
        }

       [HttpGet("genre/{genre}")]
[AllowAnonymous]
public async Task<IActionResult> GetBooksByGenre(string genre)
{
    try
    {
        // Handle null or empty genre
        if (string.IsNullOrWhiteSpace(genre))
        {
            return BadRequest(new { message = "Genre parameter is required." });
        }

        var books = await _context.Books
            .Where(b => b.Genre != null && b.Genre.Equals(genre, StringComparison.OrdinalIgnoreCase))
            .ToListAsync();
            
        if (!books.Any())
        {
            return NotFound(new { message = $"No books found in genre: {genre}." });
        }
        return Ok(books);
    }
    catch (Exception ex)
    {
        return StatusCode(500, new { message = $"Error retrieving books by genre: {ex.Message}" });
    }
}
        // GET: api/books/recommended - Public access (no authentication required)
        [HttpGet("recommended")]
        [AllowAnonymous]
        public async Task<IActionResult> GetRecommendedBooks()
        {
            var recommended = await _context.Books
                .Where(b => b.IsRecommended)
                .ToListAsync();
            return Ok(recommended);
        }

        // GET: api/books/rating/{minRating} - Public access (no authentication required)
        [HttpGet("rating/{minRating}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetBooksByMinimumRating(int minRating)
        {
            var books = await _context.Books
                .Where(b => b.Rating >= minRating)
                .ToListAsync();

            if (!books.Any())
            {
                return NotFound(new { message = $"No books found with a rating of {minRating} or higher." });
            }
            return Ok(books);
        }

        // POST: api/books - Requires authentication
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddBook([FromBody] Book newBook)
        {
            // Validate the input
            if (string.IsNullOrWhiteSpace(newBook.Title))
            {
                return BadRequest(new { message = "Title is required." });
            }

            if (string.IsNullOrWhiteSpace(newBook.Author))
            {
                return BadRequest(new { message = "Author is required." });
            }

            if (newBook.Rating < 1 || newBook.Rating > 5)
            {
                return BadRequest(new { message = "Rating must be between 1 and 5." });
            }

            await _context.Books.AddAsync(newBook);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBookById), new { id = newBook.Id }, newBook);
        }

        // PUT: api/books/{id} - Requires authentication
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateBook(int id, [FromBody] Book updatedBook)
        {
            var existingBook = await _context.Books.FindAsync(id);
            if (existingBook == null)
            {
                return NotFound(new { message = $"Book with ID {id} not found." });
            }

            // Validate the input
            if (string.IsNullOrWhiteSpace(updatedBook.Title))
            {
                return BadRequest(new { message = "Title is required." });
            }

            if (string.IsNullOrWhiteSpace(updatedBook.Author))
            {
                return BadRequest(new { message = "Author is required." });
            }

            if (updatedBook.Rating < 1 || updatedBook.Rating > 5)
            {
                return BadRequest(new { message = "Rating must be between 1 and 5." });
            }

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Genre = updatedBook.Genre;
            existingBook.Rating = updatedBook.Rating;
            existingBook.IsRecommended = updatedBook.IsRecommended;

            await _context.SaveChangesAsync();
            return Ok(existingBook);
        }

        // DELETE: api/books/{id} - Requires authentication
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound(new { message = $"Book with ID {id} not found." });
            }

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // POST: api/books/{id}/recommend - Requires authentication
        [HttpPost("{id}/recommend")]
        [Authorize]
        public async Task<IActionResult> ToggleRecommendation(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound(new { message = $"Book with ID {id} not found." });
            }

            book.IsRecommended = !book.IsRecommended;
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = $"Book '{book.Title}' recommendation toggled to {book.IsRecommended}",
                book = book
            });
        }
    }
}