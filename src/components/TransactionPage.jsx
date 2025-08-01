import React, { useContext } from 'react';
import TransactionFilter from '../components/TransactionFilter';
import TransactionTable from '../components/TransactionTable';
import { TransactionContext } from '../context/TransactionContext';

function TransactionPage() {
  const {
    transactions,
    selectedCategory,
    showRecentOnly,
    setSelectedCategory,
    toggleDateFilter,
  } = useContext(TransactionContext);

  const categories = [...new Set(transactions.map(tx => tx.category))];

  const isRecent = (dateStr) => {
    const date = new Date(dateStr);
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return date >= sevenDaysAgo;
  };

  const filteredTransactions = transactions.filter(tx => {
    const categoryMatch = selectedCategory ? tx.category === selectedCategory : true;
    const dateMatch = showRecentOnly ? isRecent(tx.date) : true;
    return categoryMatch && dateMatch;
  });

  return (
    <div className="container my-4">
      <h2 className="mb-4">💸 Transaction Viewer</h2>

      <TransactionFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        showRecentOnly={showRecentOnly}
        onDateFilterToggle={toggleDateFilter}
        categories={categories}
      />

      <TransactionTable transactions={filteredTransactions} />
    </div>
  );
}

export default TransactionPage;
