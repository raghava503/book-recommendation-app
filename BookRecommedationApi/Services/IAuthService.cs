using BookRecommendationApi.Models;

namespace BookRecommendationApi.Services;

public interface IAuthService
{
    Task<string?> AuthenticateAsync(string username, string password);
    string GenerateToken(User user);
}