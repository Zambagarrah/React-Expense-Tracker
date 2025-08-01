// This will allow users to add either an expense or income, with all the required fields: name/source, amount in KES, category, and date. We’ll connect it to the global context so the data instantly updates and persists.

import React, { useState, useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { Form, Button, Row, Col } from 'react-bootstrap';

const TransactionForm = () => {
  const { addTransaction } = useContext(TransactionContext);

  // Form state for new entry
  const [form, setForm] = useState({
    type: 'Income',
    description: '',
    amount: '',
    category: '',
    date: '',
  });

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(form.amount);
    if (!form.description || isNaN(parsedAmount)) return;

    // Create transaction object
    const transaction = {
      ...form,
      amount: parsedAmount,
    };

    addTransaction(transaction); // Add to context
    setForm({ ...form, description: '', amount: '', category: '', date: '' }); // Clear fields
  };

  return (
    <Form onSubmit={handleSubmit} className="my-4">
      <Row className="g-2">
        <Col md={2}>
          <Form.Select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Control
            type="text"
            placeholder="Name/Source"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </Col>
        <Col md={2}>
          <Form.Control
            type="number"
            placeholder="KES Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />
        </Col>
        <Col md={2}>
          <Form.Control
            type="text"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
        </Col>
        <Col md={2}>
          <Form.Control
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </Col>
        <Col md={2}>
          <Button type="submit" variant="success" className="w-100">
            Add Entry
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default TransactionForm;
