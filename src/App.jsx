import React from 'react';
import InitialBalanceInput from './components/InitialBalanceInput';
import TransactionForm from './components/TransactionForm';
import SummaryCard from './components/SummaryCard';
import TransactionTable from './components/TransactionTable';

function App() {
  return (
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
  );
}

export default App;

