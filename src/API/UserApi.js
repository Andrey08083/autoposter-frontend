import requestInstance from './index';
import serverRoutes from '../Constants/ServerRoutes';

const { USER, MAIL } = serverRoutes;

export async function registerUserRequest(data) {
  return requestInstance.post(`${USER.USER_ROUTER}${USER.REGISTRATION}`, data);
}

export async function loginUserRequest(data) {
  return requestInstance.post(`${USER.USER_ROUTER}${USER.LOGIN}`, data);
}

export async function confirmUserAccount(confirmationCode) {
  return requestInstance.get(`${MAIL.MAIL_ROUTER}${MAIL.CONFIRM_ACCOUNT}/${confirmationCode}`);
}
