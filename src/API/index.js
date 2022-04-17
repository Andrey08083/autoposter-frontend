import axios from 'axios';
import store from '../Store';

import serverRoutes from '../Constants/ServerRoutes';

import { cleanStoreAction, updateTokensAction } from '../Store/UserReducer';

const { USER } = serverRoutes;

export const requestInstanceWithToken = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const requestInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export default requestInstanceWithToken;

const refreshUserToken = async () => {
  try {
    const response = await requestInstance.post(
      `${USER.USER_ROUTER}${USER.REFRESH_USER_TOKEN}`,
      {},
      {
        headers: {
          authorization: `Bearer ${store.getState().userStorage.refreshToken}`,
        },
      },
    );
    store.dispatch(updateTokensAction(response.data));
    return true;
  } catch (e) {
    return false;
  }
};

requestInstanceWithToken.interceptors.request.use((config) => {
  // eslint-disable-next-line no-param-reassign
  config.headers.authorization = `Bearer ${store.getState().userStorage.accessToken}`;
  return config;
}, (error) => Promise.reject(error));

requestInstanceWithToken.interceptors.response.use(
  async (response) => response,
  async (error) => {
    if (!error.response) {
      // Mocking error for network error
      // eslint-disable-next-line no-throw-literal
      throw {
        response: {
          data: {
            errors: [error.message],
          },
        },
      };
    }

    if (error.response.status === 401 || error.response.status === 403) {
      console.log('error.response.status', error.response.status);
      try {
        const refreshTokenResult = await refreshUserToken();
        console.log('refreshTokenResult', refreshTokenResult);
        if (!refreshTokenResult) {
          store.dispatch(cleanStoreAction());
          window.location.href = '/';
          return Promise.reject(error);
        }
        const originalRequest = error.config;
        return requestInstanceWithToken.request(originalRequest);
      } catch (e) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);
