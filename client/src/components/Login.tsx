import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { loginSuccess } from '../store/authSlice';

const Login: React.FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Валидация
    if (!login || !password) {
      toast.error('Заполните все поля');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        login,
        password
      });

      // Сохраняем данные в Redux
      dispatch(loginSuccess({
        user: {
          _id: response.data._id,
          login: response.data.login,
          role: response.data.role
        },
        token: response.data.token
      }));

      // Сохраняем токен в localStorage
      localStorage.setItem('token', response.data.token);
      toast.success('Вход выполнен успешно');
      navigate('/'); // Перенаправляем на главную
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Ошибка сервера');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Вход в систему</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Логин:</label>
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            disabled={isLoading}
          />
        </div>
        
        <div className="form-group">
          <label>Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Загрузка...' : 'Войти'}
        </button>
      </form>
    </div>
  );
};

export default Login;