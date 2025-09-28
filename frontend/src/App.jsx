import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import './index.css';
import config from './constants';

function App() {
  const [user, setUser] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [backendConnected, setBackendConnected] = useState(false);
  const manifest = new Manifest({ appId: config.APP_ID, baseURL: config.BACKEND_URL });

  useEffect(() => {
    // Test backend connection on app start
    const testConnection = async () => {
      try {
        const response = await fetch('/api/health');
        if (response.ok) {
          setBackendConnected(true);
          console.log('✅ [APP] Backend connection successful.');
          // Check if user is logged in using Manifest SDK
          manifest.from('User').me()
            .then(loggedInUser => {
              if (loggedInUser) {
                setUser(loggedInUser);
                setCurrentScreen('dashboard');
              }
            })
            .catch(() => setUser(null));
        } else {
          setBackendConnected(false);
          console.error('❌ [APP] Backend connection failed: Server responded with an error.');
        }
      } catch (error) {
        setBackendConnected(false);
        console.error('❌ [APP] Backend connection failed:', error);
      }
    };
    
    testConnection();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      await manifest.login(email, password);
      const loggedInUser = await manifest.from('User').me();
      setUser(loggedInUser);
      setCurrentScreen('dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleLogout = async () => {
    await manifest.logout();
    setUser(null);
    setCurrentScreen('landing');
  };

  const handleSignup = async (name, email, password) => {
     try {
      await manifest.from('User').signup({ name, email, password });
      await handleLogin(email, password);
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Signup failed. The email might already be in use.');
    }
  };

  return (
    <div className="font-sans">
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className={`text-sm font-medium ${backendConnected ? 'text-gray-700' : 'text-red-600'}`}>
          {backendConnected ? 'Backend Connected' : 'Backend Disconnected'}
        </span>
      </div>

      {currentScreen === 'landing' || !user ? (
        <LandingPage onLogin={handleLogin} onSignup={handleSignup} />
      ) : (
        <DashboardPage user={user} onLogout={handleLogout} manifest={manifest} />
      )}
    </div>
  );
}

export default App;
