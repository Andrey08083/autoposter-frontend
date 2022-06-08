import React from 'react';
import { Navigate } from 'react-router-dom';
import store from '../Store';

function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user } = store.getState().userStorage;

  if (!user) {
    return <Navigate to="/" />;
  }

  if (!allowedRoles.length) {
    return children;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
