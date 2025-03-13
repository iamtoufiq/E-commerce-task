import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { deleteCookie, getCookie } from "../utils/cookies";
import { useState, ChangeEvent, useRef } from "react";
import { searchProducts, setSearchQuery } from "../redux/slices/productSlice";
import { fetchProductsByCategory } from "../redux/slices/productSlice";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const wishlist = useSelector((state: RootState) => state.wishlist.wishlist);
  const [searchInput, setSearchInput] = useState(""); 
  const timeoutRef = useRef<number | null>(null);

  const debouncedSearch = (query: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      dispatch(setSearchQuery(query));
      if (query.trim()) {
        dispatch(searchProducts(query));
      } else {
        if (location.pathname === "/products") {
          const params = new URLSearchParams(location.search);
          const productSlug = params.get("sub");
          dispatch(fetchProductsByCategory(productSlug || undefined));
        }
      }
    }, 500); 
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedSearch(value);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 w-full z-50 p-4">
      <div className="container mx-auto flex items-center justify-between gap-2">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          Ecommerce
        </Link>
        {location.pathname === "/products" && (
          <input
            type="text"
            placeholder="Search products..."
            value={searchInput}
            onChange={handleSearchChange}
            className="border flex-1 md:flex-none border-gray-300 rounded-md px-4 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        )}
        <div className="flex items-center gap-6">
          <Link
            to="/wishlist"
            className="relative text-gray-600 hover:text-red-500"
          >
            <FaHeart size={24} />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link
            to="/cart"
            className="relative text-gray-600 hover:text-indigo-500"
          >
            <FaShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-indigo-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
          <button
            className="bg-indigo-500 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition"
            onClick={() => {
              if (getCookie("auth") === "success") {
                deleteCookie("auth");
                navigate("/login");
                window.location.reload();
              }else{
                navigate("/login");
              }
            }}
          >
            {getCookie("auth") === "success" ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;