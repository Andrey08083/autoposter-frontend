import requestInstance from './index';
import serverRoutes from '../Constants/ServerRoutes';

const { ADMIN } = serverRoutes;

export async function getUsers() {
  return requestInstance.get(`${ADMIN.ADMIN_ROUTER}${ADMIN.USERS}`);
}

export async function getTelegramPostsByUserId(userId) {
  return requestInstance.get(`${ADMIN.ADMIN_ROUTER}${ADMIN.POSTS}/${userId}`);
}

export async function updateUserPassword(userId, password) {
  return requestInstance.post(`${ADMIN.ADMIN_ROUTER}${ADMIN.CHANGE_USER_PASSWORD}`, { userId, password });
}
