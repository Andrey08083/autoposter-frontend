import React from 'react';
import { Navigate } from 'react-router-dom';
import store from '../Store';

function ProtectedRoute({ children }) {
  const { user } = store.getState().userStorage;

  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
}

export default ProtectedRoute;
