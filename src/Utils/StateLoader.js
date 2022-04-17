export const initializeState = () => localStorage.setItem('reduxState', '{ "userStorage": { } }');

export const loadState = () => {
  const serializedState = localStorage.getItem('reduxState');

  if (serializedState === null) {
    return initializeState();
  }

  return JSON.parse(serializedState);
};

export const saveState = (state) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem('reduxState', serializedState);
};
