import { useNavigate } from "react-router-dom";
import { ServicePropsType, ServiceType } from "../../../types/Service";
import { useEffect, useState } from "react";
import { useUpdateServiceMutation } from "../serviceSlice";

export const isActivated = (serv: ServiceType, storeID: string): boolean => {
  if (serv.storeID?.includes(storeID)) {
    return true;
  } else {
    return false;
  }
};

export const updateStoreID = (
  storeID: string[] | undefined,
  storeNum: string,
  checked: boolean
): string[] => {
  let updatedStoreID: string[] = [];
  if (storeID) {
    updatedStoreID = storeID;
    if (checked) {
      storeID.includes(storeNum) ? null : updatedStoreID.push(storeNum);
    } else {
      let tempArray: string[] = [];
      storeID.includes(storeNum)
        ? (tempArray = updatedStoreID.filter((store) => store !== storeNum))
        : null;
      updatedStoreID = tempArray;
    }
  } else {
    updatedStoreID = [storeNum];
  }
  return updatedStoreID;
};

const ServiceDisplay = ({ service }: ServicePropsType) => {
  const storeNum: string = "1234";
  const [storeID, setStoreID] = useState(service.storeID);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const [UpdateService] = useUpdateServiceMutation();

  const HandleServiceActivation = async (checked: boolean) => {
    let updatedIDS = updateStoreID(storeID, storeNum, checked);
    setStoreID(updatedIDS);
    setIsChecked(checked);

    const updatedService: ServiceType = {
      _id: service._id,
      name: service.name,
      description: service.description,
      price: service.price,
      duration: service.duration,
      appointementMethod: service.appointementMethod,
      appointementCategorie: service.appointementCategorie,
      baseService: service.baseService,
      storeID,
      id: service.id,
      createdAt: service.createdAt,
      updatedAt: service.updatedAt,
      __v: service.__v,
    };

    const updateRequest = {
      updatedService,
      id: service.id,
    };

    try {
      await UpdateService(updateRequest).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isActivated(service, storeNum)) setIsChecked(true);
  }, [service, storeNum]);

  const content = (
    <div className="service-container">
      <div className="active-container">
        <label htmlFor="activeCheckbox">Actif</label>
        <div className="checkbox-wrapper-31" id="activeCheckbox">
          <input
            type="checkbox"
            checked={isChecked}
            onClick={() => HandleServiceActivation(!isChecked)}
            onChange={() => console.log(isChecked)}
          />
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
