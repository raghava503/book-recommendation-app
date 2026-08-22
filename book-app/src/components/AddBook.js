import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookService } from '../services/api';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import showToast from '../services/toastService';

const AddBook = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    rating: 5,
    isRecommended: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBook({
      ...book,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await bookService.add(book);
showToast.success('✅ Book added successfully!');
navigate('/books');
    }catch (err) {
    const message = err.response?.data?.message || 'Failed to add book. Please make sure you are logged in.';
    setError(message);
    showToast.error(message);
} finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Card style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Card.Body>
          <h2 className="mb-4">Add New Book</h2>
          
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title *</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter book title"
                value={book.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Author *</Form.Label>
              <Form.Control
                type="text"
                name="author"
                placeholder="Enter author name"
                value={book.author}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Genre *</Form.Label>
              <Form.Control
                type="text"
                name="genre"
                placeholder="Enter genre (e.g., Fantasy, Sci-Fi)"
                value={book.genre}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                name="rating"
                min="1"
                max="5"
                value={book.rating}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Recommended"
                name="isRecommended"
                checked={book.isRecommended}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button 
                variant="primary" 
                type="submit"
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Add Book'}
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => navigate('/books')}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddBook;