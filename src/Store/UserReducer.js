const ACTIONS = {
  SET_USER: 'SET_USER',
  SET_ACCESS_TOKEN: 'SET_ACCESS_TOKEN',
  SET_REFRESH_TOKEN: 'SET_REFRESH_TOKEN',
  REMOVE_USER: 'SET_USER',
  SIGN_IN_USER: 'SIGN_IN_USER',
  UPDATE_TOKENS: 'UPDATE_TOKENS',
  CLEAN_STORE: 'CLEAN_STORE',
};

const defaultState = { };

export const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.SET_USER: {
      return { ...state, user: action.payload };
    }
    case ACTIONS.REMOVE_USER: {
      return { ...state, user: defaultState };
    }
    case ACTIONS.UPDATE_TOKENS: {
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    }
    case ACTIONS.CLEAN_STORE: {
      return { };
    }
    case ACTIONS.SIGN_IN_USER: {
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.token.accessToken,
        refreshToken: action.payload.token.refreshToken,
      };
    }
    default:
      return state;
  }
};

export const setUserAction = (payload) => ({ type: ACTIONS.SET_USER, payload });

export const updateTokensAction = (payload) => ({ type: ACTIONS.UPDATE_TOKENS, payload });

export const removeUserAction = () => ({ type: ACTIONS.REMOVE_USER, payload: null });

export const cleanStoreAction = () => ({ type: ACTIONS.CLEAN_STORE, payload: {} });

export const signInAction = (payload) => ({ type: ACTIONS.SIGN_IN_USER, payload });
