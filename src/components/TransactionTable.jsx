import React, { useContext, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { TransactionContext } from '../context/TransactionContext';
import EditTransactionModal from './EditTransactionModal';

const TransactionTable = () => {
  const { transactions, deleteTransaction, updateTransaction } = useContext(TransactionContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleEdit = (index) => {
    setSelectedIndex(index);
    setShowModal(true);
  };

  const handleSave = (updatedData) => {
    updateTransaction(selectedIndex, updatedData);
    setShowModal(false);
    setSelectedIndex(null);
  };

  return (
    <>
      <Table striped bordered hover responsive className="my-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Description</th>
            <th>Amount (KES)</th>
            <th>Category</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr><td colSpan="7" className="text-center">No entries yet</td></tr>
          ) : (
            transactions.map((tx, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td className={tx.type === 'Income' ? 'text-success' : 'text-danger'}>{tx.type}</td>
                <td>{tx.description}</td>
                <td>{tx.amount.toLocaleString()}</td>
                <td>{tx.category || '-'}</td>
                <td>{tx.date || '-'}</td>
                <td>
                  <Button size="sm" variant="outline-primary" onClick={() => handleEdit(idx)}>✏️</Button>{' '}
                  <Button size="sm" variant="outline-danger" onClick={() => deleteTransaction(idx)}>🗑️</Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* 🔧 Edit Modal */}
      {showModal && (
        <EditTransactionModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          originalData={transactions[selectedIndex]}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default TransactionTable;
