import React, { useContext } from 'react';
import { Table } from 'react-bootstrap';
import { TransactionContext } from '../context/TransactionContext';

const TransactionTable = () => {
  const { transactions } = useContext(TransactionContext);

  return (
    <Table striped bordered hover responsive className="my-4">
      <thead>
        <tr>
          <th>#</th>
          <th>Type</th>
          <th>Description</th>
          <th>Amount (KES)</th>
          <th>Category</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {transactions.length === 0 ? (
          <tr><td colSpan="6" className="text-center">No entries yet</td></tr>
        ) : (
          transactions.map((tx, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td className={tx.type === 'Income' ? 'text-success' : 'text-danger'}>{tx.type}</td>
              <td>{tx.description}</td>
              <td>{tx.amount.toLocaleString()}</td>
              <td>{tx.category || '-'}</td>
              <td>{tx.date || '-'}</td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};

export default TransactionTable;
