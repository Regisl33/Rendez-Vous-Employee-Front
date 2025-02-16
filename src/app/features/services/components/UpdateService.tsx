import { useParams } from "react-router-dom";
import { useGetServiceByIDQuery } from "../serviceSlice";
import { ServiceType } from "../../../types/Service";
import { useEffect, useState } from "react";
import UpdateServiceForm from "./UpdateServiceForm";

const UpdateService = () => {
  const [service, setService] = useState<ServiceType>();
  const { servID } = useParams<string>();

  useEffect(() => {
    try {
      if (servID) {
        const {
          data: currentService,
          isError,
          error,
        } = useGetServiceByIDQuery(servID);
        if (isError) throw error;
        setService(currentService);
      } else {
        throw new Error("Server ID cant be undefined");
      }
    } catch (err) {
      console.error(err);
    }
  }, [servID, useGetServiceByIDQuery, setService]);

  const content = (
    <main>{service && <UpdateServiceForm service={service} />}</main>
  );

  return content;
};

export default UpdateService;
