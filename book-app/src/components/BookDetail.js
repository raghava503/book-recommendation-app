import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookService } from '../services/api';
import { Container, Card, Button, Spinner, Badge } from 'react-bootstrap';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      const response = await bookService.getById(id);
      setBook(response.data);
    } catch (err) {
      console.error('Failed to fetch book:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner animation="border" className="mt-5" />;
  if (!book) return <p className="mt-5">Book not found</p>;

  return (
    <Container className="mt-4">
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
          <Button variant="secondary" onClick={() => navigate('/books')}>
            Back to Books
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BookDetail;