import { useEffect, useState } from "react";
import { useGetServiceByStoreQuery } from "../serviceSlice";
import { CategoriePropsType, ServiceType } from "../types/Service";
import ServiceDisplay from "./ServiceDisplay";

const ServicesByCategorie = ({ cat }: CategoriePropsType) => {
  //This will change soon after creating the store db
  const storeID: string = "1234";
  //Gets the Service Data
  const {
    data: serviceData,
    isError,
    error,
  } = useGetServiceByStoreQuery(storeID);
  //State for the filtered Service by Categorie
  const [filteredServ, setFilteredServ] = useState<ServiceType[]>([]);
  //This checks if there is an error from the fetch and filter the services for that spécifique catégorie
  useEffect(() => {
    if (isError) {
      console.error(error);
    } else if (serviceData && serviceData.ids.length > 0) {
      let filteredArray: ServiceType[] = [];
      serviceData.ids.map((id: number) =>
        serviceData.entities[id].appointementCategorie === cat
          ? filteredArray.push(serviceData.entities[id])
          : null
      );
      setFilteredServ(filteredArray);
    }
  }, [error, isError, serviceData]);

  const content = (
    <>
      <h2>{cat}</h2>
      <div className="category-container">
        {filteredServ.map((serv: ServiceType) => (
          <ServiceDisplay service={serv} key={serv.id} />
        ))}
      </div>
    </>
  );
  return content;
};

export default ServicesByCategorie;
