import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './paginas/Principal/App';

describe('Rotas', () => {
  test('Rota principal', () => {
    render(<App />, { wrapper: BrowserRouter });
    const rotaPrincipal = screen.getByText('Olá, Joana :)!');
    expect(rotaPrincipal).toBeInTheDocument();
  });
});
