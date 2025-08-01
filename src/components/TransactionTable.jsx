import React, { useContext, useState, useRef } from 'react';
import { Table, Button } from 'react-bootstrap';
import { TransactionContext } from '../context/TransactionContext';
import EditTransactionModal from './EditTransactionModal';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const TransactionTable = ({ transactions: filteredTxs }) => {
  const { transactions, deleteTransaction, updateTransaction } = useContext(TransactionContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const exportRef = useRef();

  const handleEdit = (index) => {
    setSelectedIndex(index);
    setShowModal(true);
  };

  const handleSave = (updatedData) => {
    updateTransaction(selectedIndex, updatedData);
    setShowModal(false);
    setSelectedIndex(null);
  };

  const exportPDF = async () => {
    if (!exportRef.current) return;
    const canvas = await html2canvas(exportRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const imgHeight = (imgProps.height * pageWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, imgHeight);
    pdf.save('expenses.pdf');
  };

  const displayedTxs = filteredTxs || transactions;

  return (
    <>
      <div className="d-flex flex-wrap justify-content-start gap-3 mb-3">
        <CSVLink
          data={displayedTxs}
          filename="expenses.csv"
          className="btn btn-success"
        >
          Export CSV
        </CSVLink>
        <Button onClick={exportPDF} className="btn btn-danger">
          Export PDF
        </Button>
      </div>

      <div ref={exportRef}>
        <Table striped bordered hover responsive className="my-4">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Category</th>
              <th>Amount (KES)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedTxs.length === 0 ? (
              <tr><td colSpan="5" className="text-center">No entries found</td></tr>
            ) : (
              displayedTxs.map((tx, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{tx.date}</td>
                  <td>{tx.category || '-'}</td>
                  <td>{tx.amount.toLocaleString()}</td>
                  <td>
                    <Button size="sm" variant="outline-primary" onClick={() => handleEdit(idx)}>✏️</Button>{' '}
                    <Button size="sm" variant="outline-danger" onClick={() => deleteTransaction(idx)}>🗑️</Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

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
