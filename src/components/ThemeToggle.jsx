// src/components/ThemeToggle.jsx
import React, { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import '../styles/ThemeToggle.css'; // ⬅️ External CSS for positioning

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(TransactionContext);

  return (
    <button 
      className="theme-toggle-pill btn btn-light"
      onClick={toggleTheme}
    >
      {theme === 'light' ? '🌙' : '🌞'}
    </button>
  );
}

export default ThemeToggle;
