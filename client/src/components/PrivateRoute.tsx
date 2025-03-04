import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../store/store';

const PrivateRoute = () => {
  const { token, user } = useSelector((state: RootState) => state.auth);
  
  if (!token) return <Navigate to="/login" replace />;
  if (user?.role !== 'manager') return <Navigate to="/" replace />; // Проверка роли
  
  return <Outlet />;
};

export default PrivateRoute;