import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import NormalizedCategorySubcategoryData from "../../constant/NormalizedCategorySubcategoryData";

interface Subcategory {
  slug: string;
  name: string;
  url: string;
}

interface SubCategoryState {
  subcategories: Subcategory[];
  loading: boolean;
}

const initialState: SubCategoryState = {
  subcategories: [],
  loading: false,
};

const subCategorySlice = createSlice({
  name: "subCategories",
  initialState,
  reducers: {
    setSubcategories: (state, action: PayloadAction<string>) => {
      state.loading = false;
      const category = NormalizedCategorySubcategoryData.find(
        (cat) => cat.slug === action.payload
      );
      state.subcategories = category ? category.subcategories : [];
    },
    setLoading: (state) => {
      state.loading = true;
    },
  },
});

export const { setSubcategories, setLoading } = subCategorySlice.actions;
export default subCategorySlice.reducer;
