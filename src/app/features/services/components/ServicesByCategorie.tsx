import { useEffect, useState } from "react";
import { useGetServiceByStoreQuery } from "../serviceSlice";
import { AppointementCategorie, ServiceType } from "../../../types/Service";
import ServiceDisplay from "./ServiceDisplay";

type propsType = {
  cat: AppointementCategorie;
};

const ServicesByCategorie = ({ cat }: propsType) => {
  const storeID: string = "1234";
  const {
    data: serviceData,
    isError,
    error,
  } = useGetServiceByStoreQuery(storeID);
  const [filteredServ, setFilteredServ] = useState<ServiceType[]>([]);

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
    <div className="category-container">
      <h2>{cat}</h2>
      {filteredServ.map((serv: ServiceType) => (
        <ServiceDisplay service={serv} key={serv.id} />
      ))}
    </div>
  );
  return content;
};

export default ServicesByCategorie;
