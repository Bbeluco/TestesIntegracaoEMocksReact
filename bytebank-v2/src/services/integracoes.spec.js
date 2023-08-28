import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../paginas/Principal/App';
import { buscaTransacoes } from './transacoes';

describe('Testes API', () => {
  test('Teste sobre quantidade de transacoes', async () => {
    const qtdTransacoes = await buscaTransacoes();
    expect(qtdTransacoes).toHaveLength(3);

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const listaTransacoes = await screen.findAllByText('Novembro');
    listaTransacoes.forEach((transacao) =>
      expect(transacao).toBeInTheDocument()
    );
  });
});
