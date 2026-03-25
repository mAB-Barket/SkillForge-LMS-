import React, { useEffect, useState } from 'react';
import AppRoutes from './routes/AppRoutes.jsx';
import AppNavbar from './components/AppNavbar.jsx';
import AppFooter from './components/AppFooter.jsx';

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem('sf-theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sf-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="app-shell">
      <AppNavbar theme={theme} onToggleTheme={toggleTheme} />
      <div className="container app-content">
        <AppRoutes />
      </div>
      <AppFooter />
    </div>
  );
};

export default App;
