import { categories } from "./CreateService";
import ServicesByCategorie from "./ServicesByCategorie";

const StoreServices = () => {
  const content = (
    <div className="display-service-container">
      {categories.map((cat) => (
        <ServicesByCategorie cat={cat} key={cat} />
      ))}
    </div>
  );

  return content;
};

export default StoreServices;
