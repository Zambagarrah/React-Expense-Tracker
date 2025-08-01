// src/components/TransactionFilter.jsx
import React from 'react';

function TransactionFilter({
  selectedCategory,
  onCategoryChange,
  showRecentOnly,
  onDateFilterToggle,
  categories,
}) {
  return (
    <div className="d-flex flex-wrap gap-3 align-items-center my-3">
      {/* Category Dropdown */}
      <select
        className="form-select"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {/* Date Filter Toggle */}
      <button
        className={`btn ${showRecentOnly ? 'btn-dark' : 'btn-outline-dark'}`}
        onClick={onDateFilterToggle}
      >
        {showRecentOnly ? 'Showing Recent (7 days)' : 'Show Recent Only'}
      </button>
    </div>
  );
}

export default TransactionFilter;
