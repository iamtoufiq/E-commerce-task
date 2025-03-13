import { useNavigate } from "react-router-dom";
import { routes } from "../constant/routes";

interface CategoryProps {
  slug: string;
  name: string;
}

const CategoryCard: React.FC<CategoryProps> = ({ slug, name }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`${routes.SubCategoryPage}/${slug}`)}
      className="group bg-white p-6 rounded-lg hover:shadow-sm transition-all border border-gray-200 text-center cursor-pointer"
    >
      <h3 className="text-xl font-semibold text-primary group-hover:text-blue-600 transition-colors">
        {name}
      </h3>
    </div>
  );
};

export default CategoryCard;
