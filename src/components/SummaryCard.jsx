// The SummaryCard component—a sleek display that shows real-time totals for Income, Expenses, and Balance in KES. It's dynamic, responds to context changes, and makes your dashboard feel complete.

import React, { useContext } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { TransactionContext } from '../context/TransactionContext';

const SummaryCard = () => {
  const { transactions } = useContext(TransactionContext);

  // Totals
  const income = transactions
    .filter((t) => t.type === 'Income')
    .reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions
    .filter((t) => t.type === 'Expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expense;

  return (
    <Card className="text-center my-3">
      <Card.Body>
        <Row>
          <Col><h5>Total Income</h5><p className="text-success fw-bold">KES {income.toLocaleString()}</p></Col>
          <Col><h5>Total Expenses</h5><p className="text-danger fw-bold">KES {expense.toLocaleString()}</p></Col>
          <Col><h5>Balance</h5><p className={`fw-bold ${balance >= 0 ? 'text-primary' : 'text-danger'}`}>KES {balance.toLocaleString()}</p></Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default SummaryCard;
