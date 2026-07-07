import React, { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  useEffect(() => {
    document.title = 'Aboriginal Jobline - Find Your Dream Job';
  }, []);

  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;