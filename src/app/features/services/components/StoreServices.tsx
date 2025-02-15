import { categories } from "./CreateService";
import ServicesByCategorie from "./ServicesByCategorie";

const StoreServices = () => {
  const content = (
    <main>
      {categories.map((cat) => (
        <ServicesByCategorie cat={cat} key={cat} />
      ))}
    </main>
  );

  return content;
};

export default StoreServices;
