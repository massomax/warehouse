import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Login from './components/Login';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import WarehouseList from './components/WarehouseList';
import WarehouseForm from './components/WarehouseForm';
import WarehouseDetails from './components/WarehouseDetails';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<><Header /><Home /></>} />
            <Route path="/dashboard" element={<><Header /><Dashboard /></>} />
            <Route path="/warehouses" element={<><Header /><WarehouseList /></>} />
            <Route path="/warehouses/new" element={<><Header /><WarehouseForm /></>} />
            <Route path="/warehouses/:id" element={<><Header /><WarehouseDetails /></>} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;