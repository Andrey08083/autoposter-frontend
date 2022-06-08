import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import WorkspacePage from './Pages/WorkspacePage';
import ProtectedRoute from './Components/ProtectedRoute';
import WorkspaceCreatePostPage from './Pages/WorkspaceCreatePostPage';
import WorkspaceSettingsPage from './Pages/WorkspaceSettingsPage';
import WorkspacePostsPage from './Pages/WorkspacePostsPage';
import AdminPage from './Pages/AdminPage';
import AdminPostsPage from './Pages/AdminPostsPage';
import LogoutPage from './Pages/LogoutPage';
import NotFoundPage from './Pages/NotFoundPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/sign-up" element={<RegisterPage />} />
        <Route path="/sign-in" element={<LoginPage />} />
        <Route exact path="/logout" element={<LogoutPage />} />

        <Route exact path="/workspace" element={<ProtectedRoute> <WorkspacePage /> </ProtectedRoute>} />
        <Route exact path="/workspace/posts" element={<ProtectedRoute> <WorkspacePostsPage /> </ProtectedRoute>} />
        <Route exact path="/workspace/create" element={<ProtectedRoute> <WorkspaceCreatePostPage /> </ProtectedRoute>} />
        <Route exact path="/workspace/settings" element={<ProtectedRoute> <WorkspaceSettingsPage /> </ProtectedRoute>} />

        <Route exact path="/admin" element={<ProtectedRoute allowedRoles={['Admin']}> <AdminPage /> </ProtectedRoute>} />
        <Route exact path="/admin/:userId/posts" element={<ProtectedRoute allowedRoles={['Admin']}> <AdminPostsPage /> </ProtectedRoute>} />

        <Route exact path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
