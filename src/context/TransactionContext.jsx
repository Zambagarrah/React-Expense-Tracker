// This file handles:
// Initial balance
// Transaction list
// Actions: add, delete, edit
// Auto-save to localStorage

// src/context/TransactionContext.jsx
import React, { createContext, useState, useEffect } from 'react';

// Create context
export const TransactionContext = createContext();

// Provider component that wraps the app
export const TransactionProvider = ({ children }) => {
  // Load initial balance from localStorage or default to 0
  const [initialBalance, setInitialBalance] = useState(() => {
    const saved = localStorage.getItem('initialBalance');
    return saved ? parseFloat(saved) : 0;
  });

  // Load transactions from localStorage or start with empty array
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });

  // Save changes to localStorage whenever transactions change
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('initialBalance', initialBalance);
  }, [initialBalance]);

  // Add new transaction (income or expense)
  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  // Delete a transaction by its index
  const deleteTransaction = (index) => {
    const updated = [...transactions];
    updated.splice(index, 1);
    setTransactions(updated);
  };

  // Edit an existing transaction
  const editTransaction = (index, updatedData) => {
    const updated = [...transactions];
    updated[index] = { ...updated[index], ...updatedData };
    setTransactions(updated);
  };

  return (
    <TransactionContext.Provider
      value={{
        initialBalance,
        setInitialBalance,
        transactions,
        addTransaction,
        deleteTransaction,
        editTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
