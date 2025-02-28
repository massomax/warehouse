import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="header">
      <h1 className="header__title">Медицинский складской учет</h1>
      <button 
        className="header__logout-btn"
        onClick={handleLogout}
      >
        Выйти
      </button>
    </header>
  );
};

export default Header;