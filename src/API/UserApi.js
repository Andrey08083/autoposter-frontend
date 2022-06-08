import requestInstance from './index';
import serverRoutes from '../Constants/ServerRoutes';

const { USER } = serverRoutes;

export async function registerUserRequest(data) {
  return requestInstance.post(`${USER.USER_ROUTER}${USER.REGISTRATION}`, data);
}

export async function loginUserRequest(data) {
  return requestInstance.post(`${USER.USER_ROUTER}${USER.LOGIN}`, data);
}

export async function logoutUserRequest() {
  return requestInstance.post(`${USER.USER_ROUTER}${USER.LOGOUT}`);
}
