import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { Web3Provider } from './contexts/Web3Context';

// Components
import Navbar from './components/common/Navbar';
import Home from './components/common/Home';
import VoterDashboard from './components/voting/VoterDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { useWeb3 } from './contexts/Web3Context';

// Theme
import theme from './assets/styles/theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Web3Provider>
        <Router>
          <div className="app">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/voter/*"
                element={
                  <ProtectedRoute>
                    <VoterDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </Web3Provider>
    </ChakraProvider>
  );
}

export default App; 