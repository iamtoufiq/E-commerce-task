import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByCategory } from "../redux/slices/productSlice";
import { RootState, AppDispatch } from "../redux/store";
import LoadingSpinner from "../components/LoadingSpinner";
import { addToCart } from "../redux/slices/cartSlice";
import { toggleWishlist } from "../redux/slices/wishlistSlice";

interface Product {
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

const Products = () => {
  const [searchParams] = useSearchParams();
  const productSlug = searchParams.get("sub");
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const {
    products: fetchedProducts,
    isFetchingCategory,
    error,
  } = useSelector((state: RootState) => state.products);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<string>("");
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  useEffect(() => {
    let result = [...fetchedProducts];
    result = result.filter((product) => {
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesRating = product.rating >= minRating;
      const matchesStock = inStockOnly ? product.stock > 0 : true;
      return matchesPrice && matchesRating && matchesStock;
    });

    if (sortOption === "priceLowToHigh") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHighToLow") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "ratingHighToLow") {
      result.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(result);
  }, [fetchedProducts, priceRange, minRating, inStockOnly, sortOption]);

  useEffect(() => {
    dispatch(fetchProductsByCategory(productSlug || undefined));
  }, [productSlug, dispatch]);

  const handleReset = () => {
    setPriceRange([0, 1000]);
    setMinRating(0);
    setInStockOnly(false);
    setSortOption("");
    setIsFilterOpen(false);
  };

  if (isFetchingCategory) return <LoadingSpinner />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-all"
      >
        ⬅ Back
      </button>

      <h2 className="text-2xl sm:text-3xl font-bold text-indigo-600 text-center mb-6 sm:mb-8 capitalize">
        {productSlug
          ? `${productSlug.replace("-", " ")} - Products`
          : "All Products"}
      </h2>

      <div className="flex flex-col lg:flex-row gap-6">
        <div
          className={`lg:w-1/4 w-full bg-white p-4 rounded-lg shadow-md transition-all duration-300 ${
            isFilterOpen ? "block" : "hidden lg:block"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="lg:hidden text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </label>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Number(e.target.value), priceRange[1]])
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
              className="w-full h-2 mt-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Rating
            </label>
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value={0}>All</option>
              <option value={3}>3+ Stars</option>
              <option value={4}>4+ Stars</option>
              <option value={5}>5 Stars</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 accent-indigo-500"
              />
              <span className="text-sm text-gray-700">In Stock Only</span>
            </label>
          </div>

          <button
            onClick={handleReset}
            className="w-full px-4 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-all"
          >
            Reset All
          </button>
        </div>

        <div className="lg:w-3/4 w-full">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="lg:hidden mb-4 w-full px-4 py-2 bg-indigo-500 text-white text-sm rounded-md hover:bg-indigo-600 transition-all"
          >
            Filter Options
          </button>

          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <span className="text-sm font-medium text-gray-700">
              {filteredProducts.length} Products
            </span>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">
                Sort By:
              </label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full sm:w-auto border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="">Default</option>
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
                <option value="ratingHighToLow">Rating: High to Low</option>
              </select>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-600 text-sm">
              No products found.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200"
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-40 sm:h-48 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-lg font-semibold text-indigo-600">
                      ${product.price}
                    </p>
                    <span className="text-xs text-red-500 font-medium">
                      {product.discountPercentage}% OFF
                    </span>
                  </div>
                  <p
                    className={`mt-2 text-sm font-medium ${
                      product.stock > 0 ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {product.stock > 0
                      ? `In Stock: ${product.stock}`
                      : "Out of Stock"}
                  </p>
                  <div className="mt-4 flex justify-between gap-2">
                    <button
                      onClick={() =>
                        dispatch(
                          addToCart({
                            ...product,
                            quantity: 1,
                            name: "",
                          })
                        )
                      }
                      className="flex-1 px-3 py-2 bg-indigo-500 font-bold text-white text-sm rounded-md hover:bg-indigo-700 transition"
                    >
                      Add to Cart
                    </button>
                    <button
                   onClick={() => dispatch(toggleWishlist({ ...product, name: product.title }))}
                      className="px-3 py-2 bg-gray-200 text-gray-700 text-sm rounded-md hover:bg-gray-300 transition"
                    >
                      ❤️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
