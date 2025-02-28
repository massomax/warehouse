import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../store/store';

const PrivateRoute = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  console.log('[DEBUG] PrivateRoute token:', token);
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;