// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// export interface User {
//   _id: string;
//   login: string;
//   role: 'manager' | 'employee';
// }

// interface AuthState {
//   user: User | null;
//   token: string | null;
//   status: 'idle' | 'loading' | 'succeeded' | 'failed';
// }

// const initialState: AuthState = {
//   user: null,
//   token: null,
//   status: 'idle',
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     loginSuccess: (
//       state,
//       action: PayloadAction<{ user: User; token: string }>
//     ) => {
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//       state.status = 'succeeded';
//     },
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.status = 'idle';
//     },
//     setLoading: (state) => {
//       state.status = 'loading';
//     },
//   },
// });

// export const { loginSuccess, logout, setLoading } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: null | { 
    _id: string;
    login: string;
    role: 'manager' | 'employee';
  };
  token: null | string;
}



const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<AuthState>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    }
  }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;