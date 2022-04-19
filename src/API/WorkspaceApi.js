import { requestInstanceWithToken } from './index';
import serverRoutes from '../Constants/ServerRoutes';

const { WORKSPACE, TELEGRAM, POSTS } = serverRoutes;

export async function getTelegramChannelsByUserId() {
  return requestInstanceWithToken.get(`${WORKSPACE.WORKSPACE_ROUTER}${TELEGRAM.TELEGRAM_ROUTER}${TELEGRAM.GET_TELEGRAM_CHANNELS}`);
}

export async function getTelegramConnectToken() {
  return requestInstanceWithToken.get(`${WORKSPACE.WORKSPACE_ROUTER}${TELEGRAM.TELEGRAM_ROUTER}${TELEGRAM.CONNECT_TELEGRAM}`);
}

export async function getTelegramPosts() {
  return requestInstanceWithToken.get(`${WORKSPACE.WORKSPACE_ROUTER}${TELEGRAM.TELEGRAM_ROUTER}${POSTS.POSTS_ROUTER}/`);
}

export async function sendTelegramPostToSelectedChannel(channelId, postText) {
  return requestInstanceWithToken.post(
    `${WORKSPACE.WORKSPACE_ROUTER}${TELEGRAM.TELEGRAM_ROUTER}${POSTS.POSTS_ROUTER}${POSTS.SEND_POST}`,
    { channelId, postText },
  );
}
