import { useNavigate } from "react-router-dom";
import ServicesByCategorie from "./ServicesByCategorie";
import { categories } from "../data/methodAndCategorie";

const StoreServices = () => {
  //Hooks
  const navigate = useNavigate();

  const content = (
    <div className="display-service-container">
      <button className="btn" onClick={() => navigate(`/services/add`)}>
        Ajouter un Service
      </button>
      {categories.map((cat) => (
        <ServicesByCategorie cat={cat} key={cat} />
      ))}
    </div>
  );

  return content;
};

export default StoreServices;
