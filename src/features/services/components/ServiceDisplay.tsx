import { useNavigate } from "react-router-dom";
import { ServiceType } from "../../../types/Service";

type propsType = {
  service: ServiceType;
};

const ServiceDisplay = ({ service }: propsType) => {
  const navigate = useNavigate();
  const content = (
    <div className="service-container">
      <div className="active-container">
        <div className="checkbox-wrapper-50">
          <input type="checkbox" className="plus-minus" />
        </div>
      </div>
      <div className="serv-info-container">
        <h3 onClick={() => navigate(`/services/:${service.id}`)}>
          {service.name}
        </h3>
        <button onClick={() => navigate(`/services/:${service.id}`)}>
          Modifier
        </button>
      </div>
    </div>
  );

  return content;
};

export default ServiceDisplay;
