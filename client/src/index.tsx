import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import { loginSuccess } from './store/authSlice';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const initializeAuth = async () => {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        // Декодируем токен
        const decoded = jwtDecode<{ id: string; role: string }>(token);
        
        // Запрашиваем полные данные пользователя
        const response = await axios.get(
          `http://localhost:5000/api/users/${decoded.id}`, 
          { headers: { Authorization: `Bearer ${token}` } }
        );
  
        // Диспатчим данные в Redux
        store.dispatch(
          loginSuccess({
            user: {
              _id: response.data._id,
              login: response.data.login, // Теперь login точно есть
              role: decoded.role as 'manager' | 'employee'
            },
            token
          })
        );
      } catch (error) {
        console.error('Ошибка инициализации:', error);
        localStorage.removeItem('token');
      }
    }
  };
  
  // Вызываем инициализацию перед рендером
  initializeAuth().then(() => {
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    );
  });