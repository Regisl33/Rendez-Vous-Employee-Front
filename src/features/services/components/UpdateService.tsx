import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetServiceByIDQuery } from "../serviceSlice";
import UpdateServiceForm from "./UpdateServiceForm";

const UpdateService = () => {
  //Get Service Id From params
  const { servID } = useParams<{ servID: string }>();
  const id = servID ? servID.slice(1) : undefined;
  //Get the service data
  const {
    data: currentService,
    isError,
    error,
  } = useGetServiceByIDQuery(id as string);
  //Verify if we got an error and handles it
  useEffect(() => {
    if (!id) console.error("servID must exist in url");
    if (isError) console.error(error);
  }, [servID, isError, error]);
  //Verify if we got the data and if so display the update form
  const content = (
    <div className="update-form-container">
      {currentService && <UpdateServiceForm service={currentService} />}
    </div>
  );

  return content;
};

export default UpdateService;
