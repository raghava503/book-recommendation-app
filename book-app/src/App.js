import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Add this
import 'react-toastify/dist/ReactToastify.css'; // Add this
import { authService } from './services/api';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NotFound from './components/NotFound';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        {/* ToastContainer - Add this inside the Router */}
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        
        <Routes>
          <Route path="/" element={<Navigate to="/books" />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <AddBook />
              </ProtectedRoute>
            }
          />
	<Route path="*" element={<NotFound />} />	
        </Routes>
      </div>
    </Router>
  );
}

// Create a Navbar component inline (or move to separate file)
function Navbar({ isAuthenticated, onLogout }) {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="/">📚 Book Recommendation</a>
        <div className="d-flex">
          <a href="/books" className="nav-link text-light me-3">Books</a>
          {isAuthenticated ? (
            <>
              <a href="/add" className="nav-link text-light me-3">Add Book</a>
              <button onClick={onLogout} className="btn btn-outline-light btn-sm">Logout</button>
            </>
          ) : (
            <a href="/login" className="nav-link text-light">Login</a>
          )}
        </div>
      </div>
    </nav>
  );
}

export default App;