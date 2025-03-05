import { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import { OpeningHoursType } from "../types/Store";
import { useCreateStoreMutation } from "../storeSlice";

const CreateStore = () => {
  //States
  const [storeNumber, setStoreNumber] = useState("1");
  const [storeName, setStoreName] = useState("");
  const [storeAdress, setStoreAdress] = useState("");
  const [storeCity, setStoreCity] = useState("");
  const [storeCountry, setStoreCountry] = useState("QC");
  const [storePhone, setStorePhone] = useState("");
  const [openingHours, setOpeningHours] = useState<OpeningHoursType>();
  const [isValid, setIsValid] = useState(false);
  //Refs
  const nameRef = useRef<HTMLInputElement>(null);
  //Hooks
  const [createStore] = useCreateStoreMutation();
  //UseRef Effect for Name
  useEffect(() => {
    if (nameRef.current) nameRef.current.focus;
  }, [nameRef]);
  //This useEffect checks if the form is valid
  useEffect(() => {
    if (
      storeNumber.length > 0 &&
      storeName.length > 0 &&
      storeAdress.length > 0 &&
      storeCity.length > 0 &&
      storePhone.length > 0 &&
      openingHours
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [storeNumber, storeName, storeAdress, storeCity, openingHours]);
  //Submit Func
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const storeNumberInput;
  const storeNameInput;
  const storeAdressInput;
  const storeCityInput;
  const storeCountrySelect;
  const storePhoneInput;

  const content = (
    <form className="create-store-form" onSubmit={handleSubmit}>
      <button className="btn" disabled={isValid ? false : true}>
        Create Service
      </button>
    </form>
  );

  return content;
};

export default CreateStore;
