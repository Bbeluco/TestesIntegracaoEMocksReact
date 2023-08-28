import api from './api';
import { buscaTransacoes } from './transacoes';
import { buscaSaldo } from './saldo';

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

const mockContratoRetornoSaldo = {
  valor: 50,
};

const mockRetornoSaldo = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: mockContratoRetornoSaldo });
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

  test('Mock retorno para saldo', async () => {
    api.get.mockImplementation(() => mockRetornoSaldo());

    const consulta = await buscaSaldo();

    expect(consulta).toEqual(50);
  });
});
