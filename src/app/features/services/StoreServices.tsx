import { useEffect, useState } from "react";
import { useGetServiceByStoreQuery } from "./serviceSlice";

const StoreServices = () => {
  const storeID = "1234";
  const {
    data: serviceData,
    isError,
    error,
  } = useGetServiceByStoreQuery(storeID);

  useEffect(() => {
    if (isError) {
      console.error(error);
    }
  }, [error, isError]);

  return <div></div>;
};

export default StoreServices;
