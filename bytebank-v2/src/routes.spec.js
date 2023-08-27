import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom';
import App from './paginas/Principal/App';
import Cartoes from './componentes/Cartoes/index';

describe('Rotas', () => {
  test('Rota principal', () => {
    render(<App />, { wrapper: BrowserRouter });
    const rotaPrincipal = screen.getByText('Olá, Joana :)!');
    expect(rotaPrincipal).toBeInTheDocument();
  });

  test('Rota de cartoes', () => {
    const rota = '/cartoes';

    render(
      <MemoryRouter initialEntries={[rota]}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="cartoes" element={<Cartoes />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const tituloPaginaCartoes = screen.getByTestId('titulo-principal');
    expect(tituloPaginaCartoes).toHaveTextContent('Meus cartões');
  });

  test('Deve renderizar localizacao da rota atual', () => {
    const rota = '/cartoes';

    render(
      <MemoryRouter initialEntries={[rota]}>
        <App />
      </MemoryRouter>
    );
    const localizacao = screen.getByTestId('location');
    expect(localizacao).toHaveTextContent(rota);
  });
});
