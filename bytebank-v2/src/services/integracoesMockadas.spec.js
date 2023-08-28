import Transacoes from '../componentes/Extrato/Transacoes';
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

const mockRequisicaoFalha = () => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject();
    }, 200);
  });
};

describe('Testes utilizando mocks', () => {
  test('Mock requisicao de sucesso', async () => {
    api.get.mockImplementation(() => mockRequisicao());
    const transacao = await buscaTransacoes();
    expect(transacao).toEqual(mockRetornoTransacao);
    expect(api.get).toBeCalledWith('/transacoes');
  });

  test('Mock requisicao de erro', async () => {
    api.get.mockImplementation(() => mockRequisicaoFalha());
    const transacao = await buscaTransacoes();
    expect(transacao).toEqual([]);
    expect(api.get).toBeCalledWith('/transacoes');
  });
});
