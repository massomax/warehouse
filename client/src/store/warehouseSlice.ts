import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


interface WarehouseItem {
    _id: string;
    name: string;
    category: string;
    quantity: number;
    criticalLevel: number;
  }
  
  interface Warehouse {
    _id: string;
    name: string;
    items: WarehouseItem[];
  }

interface WarehouseState {
  list: Warehouse[];
  currentWarehouse: Warehouse | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: WarehouseState = {
  list: [],
  currentWarehouse: null,
  status: 'idle'
};

// export const fetchWarehouses = createAsyncThunk<Warehouse[]>(
//     'warehouses/fetch',
//     async () => {
//       const response = await axios.get<Warehouse[]>('/api/warehouses');
//       return response.data;
//     }
//   );
export const fetchWarehouses = createAsyncThunk<Warehouse[]>(
    'warehouses/fetch',
    async () => {
      const response = await axios.get('/api/warehouses');
      return response.data;
    }
  );
  export const createWarehouse = createAsyncThunk(
    'warehouses/create',
    async (data: { name: string }) => {
      const response = await axios.post('/api/warehouses', data);
      return response.data;
    }
  );

export const fetchWarehouse = createAsyncThunk<Warehouse, string>(
    'warehouses/fetchOne',
    async (id) => {
      const response = await axios.get(`/api/warehouses/${id}`);
      return response.data;
    }
  );

const warehouseSlice = createSlice({
  name: 'warehouses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchWarehouses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWarehouses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchWarehouses.rejected, (state) => {
        state.status = 'failed';
      })
      
      // Обработка createWarehouse
      .addCase(createWarehouse.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createWarehouse.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list.push(action.payload);
      })
      .addCase(createWarehouse.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchWarehouse.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWarehouse.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentWarehouse = action.payload;
      })
      .addCase(fetchWarehouse.rejected, (state) => {
        state.status = 'failed';
        state.currentWarehouse = null;
      })
  }
});

export default warehouseSlice.reducer;