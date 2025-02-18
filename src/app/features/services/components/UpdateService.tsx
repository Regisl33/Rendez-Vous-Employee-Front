import { useParams } from "react-router-dom";
import { useGetServiceByIDQuery } from "../serviceSlice";
import { useEffect } from "react";
import UpdateServiceForm from "./UpdateServiceForm";

const UpdateService = () => {
  const { servID } = useParams<{ servID: string }>();
  const id = servID ? servID.slice(1) : undefined;

  const {
    data: currentService,
    isError,
    error,
  } = useGetServiceByIDQuery(id as string);

  useEffect(() => {
    if (!id) console.error("servID must exist in url");
    if (isError) console.error(error);
  }, [servID, isError, error]);

  const content = (
    <main>
      {currentService && <UpdateServiceForm service={currentService} />}
    </main>
  );

  return content;
};

export default UpdateService;
