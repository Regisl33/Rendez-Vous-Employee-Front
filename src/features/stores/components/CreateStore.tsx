import { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import { AddStore, Country, OpeningHoursType } from "../types/Store";
import { useCreateStoreMutation } from "../storeSlice";
import { RiArrowDropDownLine } from "react-icons/ri";
import provinces from "../data/ProvinceData";
import OpeningHoursSelector from "./OpeningHoursSelector";
import baseOpeningHours from "../data/BaseOpeningHours";

const CreateStore = () => {
  //States
  const [storeNumber, setStoreNumber] = useState("");
  const [storeName, setStoreName] = useState("");
  const [storeAdress, setStoreAdress] = useState("");
  const [storeCity, setStoreCity] = useState("");
  const [storeCountry, setStoreCountry] = useState<Country>("QC");
  const [storePhone, setStorePhone] = useState("");
  const [openingHours, setOpeningHours] =
    useState<OpeningHoursType>(baseOpeningHours);
  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState("");
  //Refs
  const nameRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);
  //Regex
  const phoneRegExp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
  //Hooks
  const [createStore] = useCreateStoreMutation();
  //UseRef Effect for Name
  useEffect(() => {
    if (nameRef.current) nameRef.current.focus;
  }, [nameRef]);
  //UseRef Effect for Error
  useEffect(() => {
    if (message.length > 0) messageRef.current?.focus;
  }, [message, messageRef]);
  //Remove Error Message
  useEffect(() => {
    setMessage("");
  }, [storePhone]);
  //This useEffect checks if the form is valid
  useEffect(() => {
    if (
      storeNumber.length > 0 &&
      storeName.length > 0 &&
      storeAdress.length > 0 &&
      storeCity.length > 0 &&
      phoneRegExp.test(storePhone) &&
      openingHours
    ) {
      setIsValid(true);
    } else if (!phoneRegExp.test(storePhone) && storePhone.length > 0) {
      setMessage("Entrez un Numéro de Téléphone Valide");
      setIsValid(false);
    } else {
      setIsValid(false);
    }
  }, [
    storeNumber,
    storeName,
    storeAdress,
    storeCity,
    openingHours,
    storePhone,
  ]);
  //Submit Func
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (openingHours) {
      const newStore: AddStore = {
        storeNumber,
        storeName,
        storeAdress,
        storeCity,
        storeCountry,
        storePhone,
        openingHours,
      };
      try {
        await createStore(newStore).unwrap();
        setMessage("");
        setStoreNumber("");
        setStoreName("");
        setStoreAdress("");
        setStoreCity("");
        setStoreCountry("QC");
        setStorePhone("");
        setOpeningHours(baseOpeningHours);
      } catch (err) {
        if (err instanceof Error) setMessage(err?.message);
        console.error(err);
      }
    } else {
      setMessage("Veuillez Entrer vos Heures d'Ouverture");
    }
  };

  const storeNumberInput = (
    <>
      <label htmlFor="storeNum" className="offscreen">
        Numéro de Succursale :
      </label>
      <input
        type="text"
        className="input"
        id="storeNum"
        autoComplete="off"
        placeholder="Numéro de Succursale"
        value={storeNumber}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setStoreNumber(e.target.value.trim())
        }
      />
    </>
  );
  const storeNameInput = (
    <>
      <label htmlFor="storeName" className="offscreen">
        Nom de la Succursale
      </label>
      <input
        type="text"
        className="input"
        id="storeName"
        autoComplete="off"
        placeholder="Nom de la Succursale"
        ref={nameRef}
        value={storeName}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setStoreName(e.target.value.toLowerCase().trim())
        }
      />
    </>
  );
  const storeAdressInput = (
    <div className="store-adress-container">
      <label htmlFor="storeAdress" className="offscreen">
        Adresse
      </label>
      <input
        type="text"
        className="input"
        id="storeAdress"
        autoComplete="off"
        placeholder="Adresse"
        value={storeAdress}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setStoreAdress(e.target.value.toLowerCase())
        }
      />
    </div>
  );
  const storeCityInput = (
    <div className="store-city-container">
      <label htmlFor="storeCity" className="offscreen">
        Ville
      </label>
      <input
        type="text"
        className="input"
        id="storeCity"
        autoComplete="off"
        placeholder="Ville"
        value={storeCity}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setStoreCity(e.target.value.toLowerCase().trim())
        }
      />
    </div>
  );
  const storeCountrySelect = (
    <div className="select-country-container">
      <label htmlFor="custom-select-country">Province:</label>
      <div className="select-custom select-country" id="custom-select-country">
        {storeCountry} <RiArrowDropDownLine />
        <ul>
          {provinces.map((co: Country) => (
            <li key={co} onClick={() => setStoreCountry(co)}>
              {co}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  const storePhoneInput = (
    <>
      <label htmlFor="storePhone" className="offscreen">
        Téléphone
      </label>
      <input
        type="text"
        className="input"
        id="storePhone"
        autoComplete="off"
        placeholder="Téléphone"
        value={storePhone}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setStorePhone(e.target.value.trim())
        }
      />
    </>
  );

  const content = (
    <div className="create-store-form">
      <p
        ref={messageRef}
        className={message.length > 0 ? "errorMsg" : "offscreen"}
      >
        {message}
      </p>
      <form className="store-form" onSubmit={handleSubmit}>
        <div className="store-name-container">
          {storeNumberInput}
          {storeNameInput}
        </div>
        {storeAdressInput}
        {storeCityInput}
        <div className="country-phone-form">
          {storeCountrySelect}
          {storePhoneInput}
        </div>
        <OpeningHoursSelector
          openingHours={openingHours}
          setOpeningHours={setOpeningHours}
        />
        <button className="btn" disabled={isValid ? false : true}>
          Create Store
        </button>
      </form>
    </div>
  );

  return content;
};

export default CreateStore;
