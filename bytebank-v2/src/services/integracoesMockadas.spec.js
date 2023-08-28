import api from './api';
import { buscaTransacoes } from './transacoes';

jest.mock('./api');

const mockRetornoTransacao = [
  {
    id: 1,
    transacao: 'Depósito',
    valor: '100',
    data: '22/11/2022',
    mes: 'Novembro',
  },
];

const mockRequisicao = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: mockRetornoTransacao }), 200);
  });
};

test('Teste utilizando mocks', async () => {
  api.get.mockImplementation(() => mockRequisicao());
  const transacao = await buscaTransacoes();
  expect(transacao).toEqual(mockRetornoTransacao);
});
