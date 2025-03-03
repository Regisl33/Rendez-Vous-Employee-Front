import { ServiceType } from "../types/Service";

const isActivated = (serv: ServiceType, storeID: string): boolean => {
  if (serv.storeID?.includes(storeID)) {
    return true;
  } else {
    return false;
  }
};

export default isActivated;
