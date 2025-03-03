import { useState, useRef, useEffect, ChangeEvent, FormEvent } from "react";
import { useUpdateServiceMutation } from "../serviceSlice";
import { useNavigate } from "react-router-dom";
import {
  ServiceType,
  AppointementCategorie,
  AppointementMethod,
  ServicePropsType,
} from "../types/Service";
import isActivated from "../utils/isActivated";
import updateStoreID from "../utils/updateStoreID";
import ServiceParams from "./ServiceParams";
import { FaEdit } from "react-icons/fa";
import { CiCircleCheck } from "react-icons/ci";
import ServiceTextInput from "./ServiceTextInput";

const UpdateServiceForm = ({ service }: ServicePropsType) => {
  //States
  const [name, setName] = useState<string>(service.name);
  const [modifyName, setModifyName] = useState(false);
  const [description, setDescription] = useState<string>(service.description);
  const [price, setPrice] = useState<number>(service.price);
  const [updatedPrice, setUpdatedPrice] = useState<string>("");
  const [duration, setDuration] = useState<number>(service.duration);
  const [updatedDuration, setUpdatedDuration] = useState<string>("");
  const [method, setMethod] = useState<AppointementMethod>(
    service.appointementMethod
  );
  const [categorie, setCategorie] = useState<AppointementCategorie>(
    service.appointementCategorie
  );
  const [storeID, setStoreID] = useState(service.storeID);
  const [isChecked, setIsChecked] = useState(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  //This will change soon after creating the store db
  const storeNum = "1234";
  //Refs
  const messageRef = useRef<HTMLParagraphElement>(null);
  //Regex
  const numberRegExp = /[^0-9]/g;
  //Hooks and Mutation
  const navigate = useNavigate();
  const [UpdateService] = useUpdateServiceMutation();
  //HandleActiveSwitch
  const HandleServiceActivation = (checked: boolean) => {
    let updatedIDS = updateStoreID(storeID, storeNum, checked);
    setStoreID(updatedIDS);
    setIsChecked(checked);
  };
  //Submit Funcs
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const updatedService: ServiceType = {
      _id: service._id,
      name,
      description,
      price,
      duration,
      appointementMethod: method,
      appointementCategorie: categorie,
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
      if (err instanceof Error) setMessage(err?.message);
      console.error(err);
    }
    navigate(-1);
  };
  //This checks if the service is active or not
  useEffect(() => {
    if (isActivated(service, storeNum)) setIsChecked(true);
  }, [service, storeNum]);
  //Remove Error Message
  useEffect(() => {
    setMessage("");
  }, [price, duration]);
  //Convert price and duration to the updatedprice and duration
  useEffect(() => {
    let tempPrice = `${price}`;
    let tempDuration = `${duration}`;
    setUpdatedPrice(tempPrice);
    setUpdatedDuration(tempDuration);
  }, []);
  //Check if the data is valid, handle the error message and set the price and duration with the updated price and duration
  useEffect(() => {
    if (
      name &&
      name.length > 0 &&
      description &&
      description.length > 0 &&
      !numberRegExp.test(updatedPrice) &&
      !numberRegExp.test(updatedDuration)
    ) {
      setPrice(parseInt(updatedPrice));
      setDuration(parseInt(updatedDuration));
      setIsValid(true);
    } else if (
      numberRegExp.test(updatedPrice) ||
      numberRegExp.test(updatedDuration)
    ) {
      setMessage("Only Numbers are accepted in the price and duration inputs");
      console.log("error");
    } else {
      setIsValid(false);
    }
  }, [name, description, updatedPrice, updatedDuration]);
  ///UseRef Effect for Error
  useEffect(() => {
    if (message.length > 0) messageRef.current?.focus;
  }, [message, messageRef]);

  const optTitleInput = modifyName ? (
    <div className="modify-name-container">
      <label className="offscreen" htmlFor="name">
        Nom
      </label>
      <input
        type="text"
        className="input"
        id="name"
        autoComplete="off"
        placeholder="Nom du Service"
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value.toLowerCase().trim())
        }
      />
      <span>
        <CiCircleCheck onClick={() => setModifyName(false)} />
      </span>
    </div>
  ) : (
    <h2>
      {name}
      <span>
        <FaEdit onClick={() => setModifyName(true)} />
      </span>
    </h2>
  );

  const activeServiceSwitch = (
    <div className="active-service">
      <label htmlFor="active-switch">
        {isChecked ? "Désactiver le Service" : "Activer le Service"}
      </label>
      <div className="checkbox-wrapper-50" id="active-switch">
        <input
          type="checkbox"
          className="plus-minus"
          checked={isChecked}
          onClick={() => HandleServiceActivation(!isChecked)}
          onChange={() => console.log(isChecked)}
        />
      </div>
    </div>
  );

  const content = (
    <form className="update-service-form" onSubmit={handleSubmit}>
      {optTitleInput}
      <ServiceTextInput
        description={description}
        setDescription={setDescription}
      />
      <ServiceParams
        price={updatedPrice}
        setPrice={setUpdatedPrice}
        duration={updatedDuration}
        setDuration={setUpdatedDuration}
        method={method}
        setMethod={setMethod}
        categorie={categorie}
        setCategorie={setCategorie}
      />
      {activeServiceSwitch}
      <button className="btn" disabled={isValid ? false : true}>
        Mettre à Jour
      </button>
      <p
        ref={messageRef}
        className={message.length > 0 ? "errorMsg" : "offscreen"}
      >
        {message}
      </p>
    </form>
  );

  return content;
};

export default UpdateServiceForm;
