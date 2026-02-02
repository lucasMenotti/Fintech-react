import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders login page', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  const loginButton = screen.getByRole('button', { name: /entrar/i });
  expect(loginButton).toBeInTheDocument();
});
