import { renderHook, act } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import { AuthProvider, useAuth } from '../../hooks/auth';

import api from '../../services/api';
import loginDataObject from '../../helpers/mockData/testSignIn';

const apiMock = new MockAdapter(api);
interface AuthState {
  token: string;
  user: string;
}

describe('Auth hook', () => {
  it('should be able to sign in', async () => {
    apiMock.onPost('/login/auth').reply(200, loginDataObject);

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'test@example.com',
      password: 'test',
    });

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith(
      '@PainelAlfred:token',
      loginDataObject.data.token,
    );
    expect(setItemSpy).toHaveBeenCalledWith(
      '@PainelAlfred:user',
      loginDataObject.data.user.data.email,
    );

    expect(result.current.user).toEqual('test@example.com');
  });

  it('should restore saveed data from storage when auth inits', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@PainelAlfred:token':
          return 'token-123';
        case '@PainelAlfred:user':
          return 'test@example.com';
        default:
          return null;
      }
    });
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user).toEqual('test@example.com');
  });

  it('should be able to sig  out', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@PainelAlfred:token':
          return 'token-123';
        case '@PainelAlfred:user':
          return 'test@example.com';
        default:
          return null;
      }
    });

    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.signOut();
    });

    expect(removeItemSpy).toBeCalledTimes(3);
    expect(result.current.user).toBeUndefined();
  });

  it('should be able to update user data', () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    const authData = {
      user: 'test@example.com',
      token: '123',
    };

    act(() => {
      result.current.updateUser(authData);
    });

    expect(setItemSpy).toHaveBeenCalledWith(
      '@PainelAlfred:user',
      authData.user,
    );

    expect(result.current.user).toEqual(authData.user);
  });
});
