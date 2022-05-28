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

export async function removeTelegramChannel(telegramChannelId) {
  return requestInstanceWithToken.delete(`${WORKSPACE.WORKSPACE_ROUTER}${TELEGRAM.TELEGRAM_ROUTER}/${telegramChannelId}`);
}

export async function sendTelegramPostToSelectedChannel(channelId, postText, buttons) {
  return requestInstanceWithToken.post(
    `${WORKSPACE.WORKSPACE_ROUTER}${TELEGRAM.TELEGRAM_ROUTER}${POSTS.POSTS_ROUTER}${POSTS.SEND_POST}`,
    { channelId, postText, buttons },
  );
}

export async function scheduleTelegramPostToSelectedChannel(channelId, postText, buttons, sendAt) {
  return requestInstanceWithToken.post(
    `${WORKSPACE.WORKSPACE_ROUTER}${TELEGRAM.TELEGRAM_ROUTER}${POSTS.POSTS_ROUTER}${POSTS.SCHEDULE_POST}`,
    {
      channelId,
      postText,
      buttons,
      sendAt,
    },
  );
}
