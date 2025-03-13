import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import LoadingSpinner from "../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { routes } from "../constant/routes";
import CategoryCard from "../components/CategoryCard";

const CategoryPage = () => {
  const navigate = useNavigate();
  const { categories, loading } = useSelector(
    (state: RootState) => state.categories
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-indigo-600 text-center mb-6">
        Categories
      </h2>

      <div className="flex justify-center mb-8">
        <button
          onClick={() => navigate(routes.Products)} 
          className="px-6 py-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 transition-all"
        >
          View All Products
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.slug} slug={category.slug} name={category.name} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
