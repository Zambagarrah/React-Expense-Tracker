import React, { useRef } from 'react';
import TransactionTable from '../components/TransactionTable';
import EditTransactionModal from '../components/EditTransactionModal';
import ExportControls from '../components/ExportControls';

const TransactionPage = ({ transactions, filteredTransactions, onEdit }) => {
  const [selectedTransaction, setSelectedTransaction] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const exportRef = useRef();

  const handleEditClick = (tx) => {
    setSelectedTransaction(tx);
    setShowModal(true);
  };

  const handleSave = (updatedTx) => {
    onEdit(updatedTx);
    setShowModal(false);
  };

  return (
    <div className="container mt-5">
      <h2>Transactions</h2>
      <div ref={exportRef}>
        <TransactionTable
          transactions={filteredTransactions}
          onEdit={handleEditClick}
        />
      </div>
      <ExportControls
        transactions={filteredTransactions}
        exportRef={exportRef}
      />
      {selectedTransaction && (
        <EditTransactionModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          transaction={selectedTransaction}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default TransactionPage;
