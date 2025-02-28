import React, { useState } from 'react';
import { useAppDispatch } from '../hooks';
import { createWarehouse } from '../store/warehouseSlice';

const WarehouseForm = () => {
  const [name, setName] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createWarehouse({ name }));
    setName('');
  };

  return (
    <div className="form-container">
      <h2>Создать новый склад</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Название склада:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-primary">
          Создать
        </button>
      </form>
    </div>
  );
};

export default WarehouseForm;