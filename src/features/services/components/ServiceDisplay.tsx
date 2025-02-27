import { useNavigate } from "react-router-dom";
import { ServiceType } from "../../../types/Service";
import { useGetServiceByStoreQuery } from "../serviceSlice";

type propsType = {
  service: ServiceType;
};

const ServiceDisplay = ({ service }: propsType) => {
  const storeID: string = "1234";
  const {
    data: serviceData,
    isError,
    error,
  } = useGetServiceByStoreQuery(storeID);
  const navigate = useNavigate();
  const content = (
    <div className="service-container">
      <div className="active-container">
        <label htmlFor="activeCheckbox">Actif</label>
        <div className="checkbox-wrapper-31" id="activeCheckbox">
          <input type="checkbox" />
          <svg viewBox="0 0 35.6 35.6">
            <circle
              className="background"
              cx="17.8"
              cy="17.8"
              r="17.8"
            ></circle>
            <circle className="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
            <polyline
              className="check"
              points="11.78 18.12 15.55 22.23 25.17 12.87"
            ></polyline>
          </svg>
        </div>
      </div>
      <div className="serv-info-container">
        <h3 onClick={() => navigate(`/services/:${service.id}`)}>
          {service.name}
        </h3>
        <button
          className="btn"
          onClick={() => navigate(`/services/:${service.id}`)}
        >
          Modifier
        </button>
      </div>
    </div>
  );

  return content;
};

export default ServiceDisplay;
