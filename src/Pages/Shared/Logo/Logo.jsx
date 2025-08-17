import { FaBuilding } from "react-icons/fa";
import { Link } from "react-router";

const Logo = ({ color }) => {

  return (
    <Link
      to="/"
      className={`flex items-center gap-2 text-xl font-bold ${color}`} 
    >
      <FaBuilding className={color} size={32} />
      <span className={color}>UrbanVilla</span>
    </Link>
  );
};

export default Logo;