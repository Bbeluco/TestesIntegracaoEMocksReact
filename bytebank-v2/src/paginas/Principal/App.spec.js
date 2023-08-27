import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import AppRoutes from '../../routes';

describe('Componente <App />', () => {
  test('Deve exibir informacao de transacao apos a ocorrencia da mesma', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const selectOpcaoTransacao = screen.getByRole('combobox');
    const inputValorTransacao = screen.getByPlaceholderText('Digite um valor');
    const botaoSubmit = screen.getByRole('button');

    userEvent.selectOptions(selectOpcaoTransacao, ['Depósito']);
    userEvent.type(inputValorTransacao, '100');
    userEvent.click(botaoSubmit);

    const listaTransacoesExtrato = screen.getByTestId('lista-transacoes');
    const itemListaTransacoesExtrato = screen.getByRole('listitem');

    expect(listaTransacoesExtrato).toContainElement(itemListaTransacoesExtrato);
  });

  test('Deve redirecionar o usuario para a pagina escolhida', () => {
    render(
      <MemoryRouter>
        <AppRoutes />
      </MemoryRouter>
    );

    const rotaCartoes = '/cartoes';
    const botaoRedirecionamentoPaginaCartoes = screen.getByText('Cartões');

    userEvent.click(botaoRedirecionamentoPaginaCartoes);

    const tituloPaginaCartoes = screen.getByTestId('titulo-principal');
    expect(tituloPaginaCartoes).toBeInTheDocument();
  });
});
