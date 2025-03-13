import { Suspense, useEffect } from "react";
import CategoryPage from "./pages/Category";
import { setCategories, setLoading } from "./redux/slices/categorySlice";
import NormalizedCategorySubcategoryData from "./constant/NormalizedCategorySubcategoryData";
import { AppDispatch } from "./redux/store";
import { useDispatch } from "react-redux";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PageLoader from "./components/PageLoader";
import LoadingSpinner from "./components/LoadingSpinner";
import { routes } from "./constant/routes";
import SubCategory from "./pages/SubCategory";
import Products from "./pages/Products";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import { PrivateRoute } from "./pages/PrivateRoute";
import Login from "./pages/Login";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setCategories(NormalizedCategorySubcategoryData));
    }, 500);
  }, [dispatch]);
  return (
    <Router>
      <PageLoader />
      <Header />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path={routes.cart} element={<Cart />} />
            <Route path={routes.wishlist} element={<Wishlist />} />
          </Route>
          <Route path={routes.CategoryPage} element={<CategoryPage />} />
          <Route
            path={`${routes.SubCategoryPage}/:categorySlug`}
            element={<SubCategory />}
          />
          <Route path={`${routes.Products}`} element={<Products />} />
          <Route path={`${routes.login}`} element={<Login />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
