// client/src/components/WarehouseDetails.tsx
import  { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchWarehouse } from '../store/warehouseSlice';

const WarehouseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentWarehouse, status } = useAppSelector((state) => state.warehouses);

  useEffect(() => {
    if (id) {
      dispatch(fetchWarehouse(id));
    }
  }, [id, dispatch]);

  if (status === 'loading') return <div>Загрузка...</div>;
  if (!currentWarehouse) return <div>Склад не найден</div>;

  return (
    <div className="warehouse-details">
      <h2>{currentWarehouse.name}</h2>
      <div className="content">
        <div className="items-list">
          <h3>Товары на складе:</h3>
          {currentWarehouse.items.map(item => (
            <div key={item._id} className="item-card">
              <span>{item.name}</span>
              <span>Количество: {item.quantity}</span>
              <span>Категория: {item.category}</span>
            </div>
          ))}
        </div>
        <Link to="/warehouses" className="btn-back">
          ← Назад к списку
        </Link>
      </div>
    </div>
  );
};

export default WarehouseDetails;