import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/LoadingSpinner";
import { setLoading, setSubcategories } from "../redux/slices/subCategorySlice";
import { RootState, AppDispatch } from "../redux/store";
import SubCategoryCard from "../components/SubCategoryCard";

const SubCategory = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { subcategories, loading } = useSelector(
    (state: RootState) => state.SubCategory
  );

  useEffect(() => {
    if (categorySlug) {
      dispatch(setLoading());
      const timer = setTimeout(() => {
        dispatch(setSubcategories(categorySlug));
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [categorySlug, dispatch]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={() => navigate("/")}
        className="mb-6 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-all"
      >
        ⬅ Back
      </button>

      <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">
        {categorySlug?.replace("-", " ")} - Subcategories
      </h2>

      {subcategories.length === 0 ? (
        <p className="text-center text-gray-600">No subcategories found.</p>
      ) : (
        <ul className="flex flex-wrap justify-center gap-6">
        {subcategories.map((sub) => (
          <SubCategoryCard key={sub.slug} slug={sub.slug} name={sub.name} />
        ))}
      </ul>
      )}
    </div>
  );
};

export default SubCategory;
