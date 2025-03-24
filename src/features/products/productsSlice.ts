import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductsState } from './productsTypes';

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload.map((product) => ({
        ...product,
        isLiked: false,
      }));
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.push({ ...action.payload, isLiked: false });
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    toggleLike: (state, action: PayloadAction<string>) => {
      const product = state.items.find((item) => item.id === action.payload);
      if (product) {
        product.isLiked = !product.isLiked;
      }
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload; 
      }
    },
  },
});

export const {
  setProducts,
  setLoading,
  setError,
  addProduct,
  removeProduct,
  toggleLike,
  updateProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
