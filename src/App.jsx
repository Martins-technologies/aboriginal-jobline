import React, { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './dashboard/auth/AuthContext';

function App() {
  useEffect(() => {
    document.title = 'Aboriginal Jobline - Find Your Dream Job';
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;