import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import showToast from '../services/toastService';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Attempting login...');
      const response = await authService.login({ username, password });
      console.log('Login response:', response);
      
      const { token } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', username);
      setIsAuthenticated(true);
      showToast.success('Login successful! Welcome back!');
      navigate('/books');
    } catch (err) {
      console.error('Login error:', err);
      const message = err.response?.data?.message || 'Login failed. Please try again.';
      setError(message);
      showToast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Card style={{ maxWidth: '400px', margin: '0 auto' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit" 
              className="w-100"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Form>
          
          <div className="text-center mt-3">
            <small className="text-muted">
              Default: username: admin, password: admin123
            </small>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;