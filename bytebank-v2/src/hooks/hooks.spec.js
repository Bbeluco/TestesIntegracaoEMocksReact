import { act, renderHook } from '@testing-library/react';
import { useEffect, useState } from 'react';
import { buscaTransacoes } from '../services/transacoes';
import useListaTransacoes from './useListaTransacoes';

jest.mock('../services/transacoes');

const mockTransacao = [
  {
    id: 1,
    transacao: 'Depósito',
    valor: '100',
    data: '22/11/2022',
    mes: 'Novembro',
  },
];

describe('Testando hooks', () => {
  test('Testando hoook nativo react', () => {
    const { result } = renderHook(() => {
      const [nome, setNome] = useState('');

      useEffect(() => {
        setNome('Bruno');
      });

      return nome;
    });

    expect(result.current).toBe('Bruno');
  });

  test('Testando hook personalizado', async () => {
    buscaTransacoes.mockImplementation(() => mockTransacao);

    const { result } = renderHook(() => useListaTransacoes());

    await act(async () => {
      result.current[1]();
    });

    expect(result.current[0]).toEqual(mockTransacao);
  });
});
