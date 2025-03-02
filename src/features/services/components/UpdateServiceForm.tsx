import { useState, useRef, useEffect, ChangeEvent, FormEvent } from "react";
import {
  ServiceType,
  AppointementCategorie,
  AppointementMethod,
  ServicePropsType,
} from "../../../types/Service";
import { useUpdateServiceMutation } from "../serviceSlice";
import ServiceParams from "./ServiceParams";
import { FaEdit } from "react-icons/fa";
import { CiCircleCheck } from "react-icons/ci";
import { isActivated, updateStoreID } from "./ServiceDisplay";

const UpdateServiceForm = ({ service }: ServicePropsType) => {
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

  const storeNum = "1234";

  const messageRef = useRef<HTMLParagraphElement>(null);

  const numberRegExp = /[^0-9]/g;

  const [UpdateService] = useUpdateServiceMutation();

  const HandleServiceActivation = (checked: boolean) => {
    let updatedIDS = updateStoreID(storeID, storeNum, checked);
    setStoreID(updatedIDS);
    setIsChecked(checked);
  };

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
  };

  useEffect(() => {
    if (isActivated(service, storeNum)) setIsChecked(true);
  }, [service, storeNum]);

  useEffect(() => {
    setMessage("");
  }, [price, duration]);

  useEffect(() => {
    let tempPrice = `${price}`;
    let tempDuration = `${duration}`;
    setUpdatedPrice(tempPrice);
    setUpdatedDuration(tempDuration);
  }, []);

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

  useEffect(() => {
    if (message.length > 0) messageRef.current?.focus;
  }, [message, messageRef]);

  const content = (
    <form className="update-service-form" onSubmit={handleSubmit}>
      {modifyName ? (
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
      )}
      <label htmlFor="description" className="offscreen">
        Description
      </label>
      <textarea
        id="description"
        autoComplete="off"
        className="textarea"
        placeholder="Description du Service"
        value={description}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setDescription(e.target.value.trim())
        }
      ></textarea>
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
