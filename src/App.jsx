import React, { useContext } from 'react';
import InitialBalanceInput from './components/InitialBalanceInput';
import TransactionForm from './components/TransactionForm';
import SummaryCard from './components/SummaryCard';
import TransactionTable from './components/TransactionTable';
import ThemeToggle from './components/ThemeToggle';
import { TransactionContext } from './context/TransactionContext';




function App() {
  const { theme } = useContext(TransactionContext);

  return (
    <div className={`app-container ${theme}`}>
      <ThemeToggle />
      <div className="container py-4">
        <header className="mb-4">
          <h1 className="text-center">💸 Expense Tracker</h1>
          <p className="text-center text-muted">Manage your income and expenses in KES</p>
        </header>

        <main>
          <InitialBalanceInput />
          <TransactionForm />
          <SummaryCard />
          <TransactionTable />
        </main>
      </div>
    </div>
  );
}

export default App;

