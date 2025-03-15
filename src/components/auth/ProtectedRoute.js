import React from 'react';
import { Navigate } from 'react-router-dom';
import { useWeb3 } from '../../contexts/Web3Context';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { account, isAdmin, loading } = useWeb3();

  if (loading) {
    return null; // Or a loading spinner
  }

  if (!account) {
    return <Navigate to="/" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/voter" replace />;
  }

  return children;
};

export default ProtectedRoute; 