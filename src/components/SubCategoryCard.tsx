import { useNavigate } from "react-router-dom";
import { routes } from "../constant/routes";

interface SubCategoryProps {
  slug: string;
  name: string;
}

const SubCategoryCard: React.FC<SubCategoryProps> = ({ slug, name }) => {
  const navigate = useNavigate();

  return (
    <li
      onClick={() => navigate(`${routes.Products}?sub=${encodeURIComponent(slug)}`)}
      className="w-[300px] p-6 bg-white rounded-lg border border-gray-300 text-center cursor-pointer transition-all group hover:shadow-md hover:scale-105"
    >
      <p className="text-xl font-semibold text-gray-800 transition-colors group-hover:text-indigo-600">
        {name}
      </p>
    </li>
  );
};

export default SubCategoryCard;
