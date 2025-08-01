import React, { createContext, useState, useEffect } from 'react';

// Create context
export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  // Load initial balance
  const [initialBalance, setInitialBalance] = useState(() => {
    const saved = localStorage.getItem('initialBalance');
    return saved ? parseFloat(saved) : 0;
  });

  // Load transactions
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ Filter state
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showRecentOnly, setShowRecentOnly] = useState(false);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('initialBalance', initialBalance);
  }, [initialBalance]);

  // ✅ Actions
  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const deleteTransaction = (index) => {
    const updated = transactions.filter((_, i) => i !== index);
    setTransactions(updated);
  };

  const updateTransaction = (index, updatedTx) => {
    const updated = transactions.map((tx, i) => i === index ? updatedTx : tx);
    setTransactions(updated);
  };

  const toggleDateFilter = () => {
    setShowRecentOnly((prev) => !prev);
  };

  return (
    <TransactionContext.Provider
      value={{
        initialBalance,
        setInitialBalance,
        transactions,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        selectedCategory,
        setSelectedCategory,
        showRecentOnly,
        toggleDateFilter,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
