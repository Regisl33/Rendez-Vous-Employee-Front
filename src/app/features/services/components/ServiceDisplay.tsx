import { useNavigate } from "react-router-dom";
import { ServiceType } from "../../../types/Service";

type propsType = {
  service: ServiceType;
};

const ServiceDisplay = ({ service }: propsType) => {
  const navigate = useNavigate();
  const content = (
    <div className="service-container">
      <div className="active-container"></div>
      <div className="serv-info-container">
        <h2 onClick={() => navigate(`/services/:${service.serviceID}`)}>
          {service.name}
        </h2>
        <button onClick={() => navigate(`/services/:${service.serviceID}`)}>
          Modifier
        </button>
      </div>
    </div>
  );

  return content;
};

export default ServiceDisplay;
