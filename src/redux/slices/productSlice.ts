import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { baseUrl } from "../../constant/data";

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  thumbnail: string;
}

interface ProductState {
  products: Product[];
  loading: boolean;
  isFetchingCategory: boolean;
  error: string | null;
  searchQuery: string;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  isFetchingCategory: false,
  error: null,
  searchQuery: "",
};

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchByCategory",
  async (categorySlug?: string) => {
    const url = categorySlug
      ? `${baseUrl}/products/category/${categorySlug}`
      : `${baseUrl}/products`;
    const response = await fetch(url);
    const data = await response.json();
    return data.products;
  }
);

export const searchProducts = createAsyncThunk(
  "products/search",
  async (query: string) => {
    const url = `${baseUrl}/products/search?q=${query}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.products;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.isFetchingCategory = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.isFetchingCategory = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.isFetchingCategory = false;
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export const { setSearchQuery } = productSlice.actions;
export default productSlice.reducer;