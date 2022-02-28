import { renderHook } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import { AuthProvider, useAuth } from '../../hooks/auth';

import api from '../../services/api';
import loginDataObject from '../../helpers/mockData/testSignIn';

const apiMock = new MockAdapter(api);

describe('Auth hook', () => {
  it('should be able to sign in', async () => {
    apiMock.onPost('/login/auth').reply(200, loginDataObject);

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'test@example.com',
      password: 'test',
    });

    await waitForNextUpdate();
    expect(result.current.user).toEqual('test@example.com');
  });
});
