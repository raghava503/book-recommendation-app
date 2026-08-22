import axios from 'axios';
// Use environment variable
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';


// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API Functions
export const bookService = {
  // Get all books (public)
  getAll: () => api.get('/books'),
  
  // Get book by ID (public)
  getById: (id) => api.get(`/books/${id}`),
  
  // Get books by genre (public)
  getByGenre: (genre) => api.get(`/books/genre/${genre}`),
  
  // Get recommended books (public)
  getRecommended: () => api.get('/books/recommended'),
  
  // Add book (requires auth)
  add: (bookData) => api.post('/books', bookData),
  
  // Update book (requires auth)
  update: (id, bookData) => api.put(`/books/${id}`, bookData),
  
  // Delete book (requires auth)
  delete: (id) => api.delete(`/books/${id}`),
  
  // Toggle recommendation (requires auth)
  toggleRecommend: (id) => api.post(`/books/${id}/recommend`),
};

export const authService = {
  // Login
  login: (credentials) => api.post('/auth/login', credentials),
  
  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

export default api;