import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Category {
  name: string;
  slug: string;
  subcategories: { slug: string; name: string; url: string }[];
}

interface CategoryState {
  categories: Category[];
  loading: boolean;
}

const initialState: CategoryState = {
  categories: [],
  loading: true,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setCategories ,setLoading} = categorySlice.actions;
export default categorySlice.reducer;
