import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bookService } from '../services/api';
import { Container, Row, Col, Card, Button, Form, Badge, Spinner } from 'react-bootstrap';
import showToast from '../services/toastService';


const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [genre, setGenre] = useState('');
  const [showRecommended, setShowRecommended] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await bookService.getAll();
      setBooks(response.data);
    } catch (err) {
      setError('Failed to load books. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenreSearch = async () => {
    if (!genre.trim()) {
      fetchBooks();
      return;
    }
    
    setLoading(true);
    try {
      const response = await bookService.getByGenre(genre);
      setBooks(response.data);
    } catch (err) {
      setError('No books found for this genre.');
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRecommended = async () => {
    setShowRecommended(!showRecommended);
    setLoading(true);
    try {
      const response = showRecommended 
        ? await bookService.getAll() 
        : await bookService.getRecommended();
      setBooks(response.data);
    } catch (err) {
      setError('Failed to load books.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
  const bookToDelete = books.find(b => b.id === id);
  if (!window.confirm(`Are you sure you want to delete "${bookToDelete?.title}"?`)) return;
  
  try {
    await bookService.delete(id);
    setBooks(books.filter(book => book.id !== id));
    showToast.success(`🗑️ "${bookToDelete?.title}" deleted!`);
  } catch (err) {
    showToast.error('Failed to delete book. Make sure you are logged in.');
  }
};

  const handleToggleRecommend = async (id) => {
    try {
        await bookService.toggleRecommend(id);
        setBooks(books.map(book => 
            book.id === id ? { ...book, isRecommended: !book.isRecommended } : book
        ));
        showToast.info(`Recommendation toggled!`);
    } catch (err) {
        showToast.error('Failed to toggle recommendation. Make sure you are logged in.');
    }
};
if (loading) {
  return (
    <Container className="text-center mt-5">
      <Spinner animation="border" variant="primary" />
      <p className="mt-2">Loading books...</p>
    </Container>
  );
}

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Book Recommendations</h1>
      
      <Row className="mb-3">
        <Col md={4}>
          <Form.Group className="d-flex">
            <Form.Control
              type="text"
              placeholder="Search by genre..."
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
            <Button 
              variant="primary" 
              onClick={handleGenreSearch}
              className="ms-2"
            >
              Search
            </Button>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Button
            variant={showRecommended ? 'warning' : 'success'}
            onClick={handleRecommended}
          >
            {showRecommended ? 'Show All' : 'Show Recommended'}
          </Button>
        </Col>
        <Col md={4} className="text-end">
          <Link to="/add">
            <Button variant="primary">+ Add New Book</Button>
          </Link>
        </Col>
      </Row>

      {error && <p className="text-danger">{error}</p>}

      <Row>{books.length === 0 ? (
  <Col className="text-center mt-5">
    <h3>📚 No Books Found</h3>
    <p className="text-muted">Try adjusting your search or add a new book!</p>
    <Link to="/add">
      <Button variant="primary">+ Add New Book</Button>
    </Link>
  </Col>
) : (
          books.map((book) => (
            <Col md={4} className="mb-4" key={book.id}>
              <Card>
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    by {book.author}
                  </Card.Subtitle>
                  <Card.Text>
                    <Badge bg="info">{book.genre}</Badge>
                    <br />
                    Rating: {'⭐'.repeat(book.rating)}
                    <br />
                    {book.isRecommended && (
                      <Badge bg="success">⭐ Recommended</Badge>
                    )}
                  </Card.Text>
                  <div className="d-flex gap-2 flex-wrap">
                    <Link to={`/books/${book.id}`}>
                      <Button variant="outline-primary" size="sm">
                        View Details
                      </Button>
                    </Link>
                    <Button
                      variant="outline-warning"
                      size="sm"
                      onClick={() => handleToggleRecommend(book.id)}
                    >
                      Toggle Recommend
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(book.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default BookList;