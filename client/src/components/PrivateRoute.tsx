import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks';

const PrivateRoute = () => {
  const { token, user } = useAppSelector((state) => state.auth);
  
  if (!token) return <Navigate to="/login" replace />;
  if (user?.role !== 'manager') return <Navigate to="/" replace />; // Добавьте эту проверку
  
  return <Outlet />;
};

export default PrivateRoute;