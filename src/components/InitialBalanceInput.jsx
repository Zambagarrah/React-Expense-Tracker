import React, { useContext, useState } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { Form, Button, InputGroup } from 'react-bootstrap';

const InitialBalanceInput = () => {
  const { initialBalance, setInitialBalance } = useContext(TransactionContext);
  const [inputValue, setInputValue] = useState(initialBalance);

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsed = parseFloat(inputValue);
    if (!isNaN(parsed)) {
      setInitialBalance(parsed);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="my-3">
      <Form.Label>Set Initial Balance:</Form.Label>
      <InputGroup>
        <InputGroup.Text>KES</InputGroup.Text>
        <Form.Control
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter starting amount"
          step="0.01"
        />
        <Button type="submit" variant="primary">
          Save
        </Button>
      </InputGroup>
    </Form>
  );
};

export default InitialBalanceInput;
