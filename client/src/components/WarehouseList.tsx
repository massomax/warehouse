// client/src/components/WarehouseList.tsx
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchWarehouses } from '../store/warehouseSlice';
import { Link } from 'react-router-dom';

const WarehouseList = () => {
  console.log('[DEBUG] WarehouseList mounted');
  const dispatch = useAppDispatch();
  const { list, status } = useAppSelector((state) => state.warehouses);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (status === 'idle' && user?.role === 'manager') {
        console.log('[DEBUG] Dispatching fetchWarehouses');
        dispatch(fetchWarehouses());
    }
  }, [status, user, dispatch]);
  console.log('Warehouses list:', list);
  console.log('User role:', user?.role);
  console.log('User:', user);
console.log('Status:', status);
console.log('Warehouses:', list);

  return (
    <div className="warehouse-list">
      <div className="header">
        <h2>Мои склады</h2>
        <Link to="/warehouses/new" className="btn-primary">
          + Новый склад
        </Link>
      </div>

      {status === 'loading' && <div className="loader">Загрузка...</div>}
      
      <div className="grid">
        {list.map((warehouse) => (
          <div key={warehouse._id} className="card">
            <h3>{warehouse.name}</h3>
            <div className="stats">
              <span>Товаров: {warehouse.items.length}</span>
              <span>Категорий: {new Set(warehouse.items.map(i => i.category)).size}</span>
            </div>
            <Link 
              to={`/warehouses/${warehouse._id}`}
              className="btn-secondary"
            >
              Управление
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};


export default WarehouseList;