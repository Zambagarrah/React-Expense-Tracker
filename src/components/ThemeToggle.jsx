// ThemeToggle.jsx
import { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(TransactionContext);

  return (
    <button onClick={toggleTheme}>
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
};

export default ThemeToggle;
