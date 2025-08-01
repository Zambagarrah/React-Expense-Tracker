import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditTransactionModal = ({ show, handleClose, originalData, onSave }) => {
  const [form, setForm] = useState({ ...originalData });

  useEffect(() => {
    setForm({ ...originalData });
  }, [originalData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = { ...form, amount: parseFloat(form.amount) };
    onSave(updated);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered scrollable>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row g-3">
            <div className="col-12 col-sm-6">
              <Form.Group>
                <Form.Label>Type</Form.Label>
                <Form.Select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                >
                  <option value="Income">Income</option>
                  <option value="Expense">Expense</option>
                </Form.Select>
              </Form.Group>
            </div>

            <div className="col-12 col-sm-6">
              <Form.Group>
                <Form.Label>Amount (KES)</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                />
              </Form.Group>
            </div>

            <div className="col-12">
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </Form.Group>
            </div>

            <div className="col-12 col-sm-6">
              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                />
              </Form.Group>
            </div>

            <div className="col-12 col-sm-6">
              <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </Form.Group>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="success" type="submit">Save Changes</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditTransactionModal;
