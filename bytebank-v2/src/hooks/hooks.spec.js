import { renderHook } from '@testing-library/react';
import { useEffect, useState } from 'react';

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
});
