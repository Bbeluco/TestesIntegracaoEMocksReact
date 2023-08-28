import api from './api';
import { buscaTransacoes, salvaTransacao } from './transacoes';
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

const mockRetornoSalvarTransacao = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ status: 201 }), 200);
  });
};

const mockRetornoSalvarTransacaoFalha = () => {
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

  test('Mock retorno para saldo', async () => {
    api.get.mockImplementation(() => mockRetornoSaldo());

    const consulta = await buscaSaldo();

    expect(consulta).toEqual(50);
    expect(api.get).toBeCalledWith('/saldo');
    expect(api.get).toBeCalledTimes(1);
  });

  test('Mock requisicao POST transacoes', async () => {
    api.post.mockImplementation(() => mockRetornoSalvarTransacao());
    const segundoParametro = 'Qualquer coisa';
    const transacao = await salvaTransacao(segundoParametro);
    expect(transacao).toEqual(201);
    expect(api.post).toBeCalledTimes(1);
    expect(api.post).toBeCalledWith('/transacoes', segundoParametro);
  });

  test('Mock requisicao POST transacoes falhando', async () => {
    api.post.mockImplementation(() => mockRetornoSalvarTransacaoFalha());
    const segundoParametro = 'Qualquer coisa';
    const transacao = await salvaTransacao(segundoParametro);
    expect(transacao).toEqual('Erro na requisição');
  });
});
