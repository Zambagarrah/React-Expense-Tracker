// src/App.jsx
import React from 'react';

function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="text-center">💸 Expense Tracker</h1>
        <p className="text-center text-muted">Manage your income and expenses in KES</p>
      </header>

      <main>
        {/* Placeholder for future components */}
        <section className="bg-light p-3 rounded mb-3">
          <h4>👋 Welcome! We’ll get started with your balance and transactions soon.</h4>
        </section>
      </main>
    </div>
  );
}

export default App;


// This sets up the app layout using Bootstrap’s .container, .text-center, and .bg-light utilities. The placeholder will be replaced as we build each module.