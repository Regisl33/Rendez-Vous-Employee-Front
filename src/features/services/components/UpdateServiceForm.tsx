import { useState, useRef, useEffect, ChangeEvent, FormEvent } from "react";
import {
  ServiceType,
  AppointementCategorie,
  AppointementMethod,
} from "../../../types/Service";
import { useUpdateServiceMutation } from "../serviceSlice";
import { categories, displayMethods, methods } from "./CreateService";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { CiCircleCheck } from "react-icons/ci";

type propsType = {
  service: ServiceType;
};

const UpdateServiceForm = ({ service }: propsType) => {
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
  const [isValid, setIsValid] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const messageRef = useRef<HTMLParagraphElement>(null);

  const numberRegExp = /[^0-9]/g;

  const [UpdateService] = useUpdateServiceMutation();

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
    <form className="update-service-form">
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
      <div className="param-container">
        <div className="grid-container">
          <div className="price-container">
            <label htmlFor="price">Prix:</label>
            <input
              type="text"
              id="price"
              className="input"
              autoComplete="off"
              placeholder="Prix"
              value={updatedPrice}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUpdatedPrice(e.target.value.trim())
              }
            />
            <span>$</span>
          </div>
          <div className="duration-container">
            <label htmlFor="duration">Durée:</label>
            <input
              type="text"
              id="duration"
              className="input"
              autoCapitalize="off"
              placeholder="Durée"
              value={updatedDuration}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUpdatedDuration(e.target.value.trim())
              }
            />
            <span>Min</span>
          </div>
          <div className="select-method-container">
            <label htmlFor="custom-select-method">
              Méthode pour prendre Rendez-Vous:
            </label>
            <div
              className="select-custom select-method"
              id="custom-select-method"
            >
              {displayMethods(method)} <RiArrowDropDownLine />
              <ul>
                {methods.map((m: AppointementMethod) => (
                  <li key={m} onClick={() => setMethod(m)}>
                    {displayMethods(m)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="select-category-container">
          <label htmlFor="custom-select-category">
            Définir la Catégorie du Service:
          </label>
          <div
            className="select-custom select-category"
            id="custom-select-category"
          >
            {categorie} <RiArrowDropDownLine />
            <ul>
              {categories.map((c: AppointementCategorie) => (
                <li key={c} onClick={() => setCategorie(c)}>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="active-service">
        <label htmlFor="active-switch">Activer le Service</label>
        <div className="checkbox-wrapper-50" id="active-switch">
          <input type="checkbox" className="plus-minus" />
        </div>
      </div>
      <button
        onClick={(e: FormEvent) => handleSubmit(e)}
        className="btn"
        disabled={isValid ? false : true}
      >
        Save
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
