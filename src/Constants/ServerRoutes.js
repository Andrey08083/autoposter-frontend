export default {
  USER: {
    USER_ROUTER: '/user',
    REGISTRATION: '/register',
    LOGIN: '/login',
    LOGOUT: '/logout',
    REFRESH_USER_TOKEN: '/refresh',
    GET_USER: '/',
    UPDATE_USER: '/update',
    VERIFY_USER_ACCOUNT: '/verify',
  },
  WORKSPACE: {
    WORKSPACE_ROUTER: '/workspace',
    GET_WORKSPACE: '/',
  },
  TELEGRAM: {
    TELEGRAM_ROUTER: '/telegram',
    GET_TELEGRAM_CHANNELS: '/channels',
    CONNECT_TELEGRAM: '/connect',
  },
  POSTS: {
    POSTS_ROUTER: '/posts',
    SEND_POST: '/sendPost',
    SCHEDULE_POST: '/schedule',
    SEND_POST_BY_ID: '/send', /* /:postId/send */
    DELETE_POST_BY_ID: '/', /* /:postId */
  },
  ADMIN: {
    ADMIN_ROUTER: '/admin',
    USERS: '/users',
    POSTS: '/posts',
    CHANGE_USER_PASSWORD: '/changeUserPassword',
  },
};
