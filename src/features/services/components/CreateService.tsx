import { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import { useCreateServiceMutation } from "../serviceSlice";
import {
  AddService,
  AppointementCategorie,
  AppointementMethod,
} from "../../../types/Service";
import ServiceParams from "./ServiceParams";

export const methods: AppointementMethod[] = ["online", "phone", "none"];
export const categories: AppointementCategorie[] = [
  "Santé de la Bouche",
  "Santé de la Femme",
  "Santé de la Peau",
  "Soin des Yeux",
  "Santé Digestive",
  "Santé Voyage",
  "Santé des Oreilles",
  "Soin des Pieds",
  "Cholestérol",
  "Diabète",
  "Hypertension",
  "Injection et Prélevements",
];

export const displayMethods = (m: AppointementMethod): string => {
  switch (m) {
    case "online":
      return "En Ligne";
    case "phone":
      return "Par Téléphone";
    case "none":
      return "Sans-Rendez-Vous";
    default:
      return "Par Téléphone";
  }
};

const CreateService = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("15");
  const [duration, setDuration] = useState<string>("15");
  const [method, setMethod] = useState<AppointementMethod>("online");
  const [categorie, setCategorie] = useState<AppointementCategorie>(
    "Injection et Prélevements"
  );
  const [isValid, setIsValid] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const nameRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);

  const numberRegExp = /[^0-9]/g;

  const [CreateService] = useCreateServiceMutation();

  useEffect(() => {
    if (nameRef.current) nameRef.current.focus;
  }, [nameRef]);

  useEffect(() => {
    setMessage("");
  }, [price, duration]);

  useEffect(() => {
    if (
      name.length > 0 &&
      description.length > 0 &&
      !numberRegExp.test(price) &&
      !numberRegExp.test(duration)
    ) {
      setIsValid(true);
    } else if (numberRegExp.test(price) || numberRegExp.test(duration)) {
      setMessage("Only Numbers are accepted in the price and duration inputs");
      console.log("error");
    } else {
      setIsValid(false);
    }
  }, [name, description, price, duration]);

  useEffect(() => {
    if (message.length > 0) messageRef.current?.focus;
  }, [message, messageRef]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newService: AddService = {
      name,
      description,
      price: parseInt(price),
      duration: parseInt(duration),
      appointementMethod: method,
      appointementCategorie: categorie,
    };
    try {
      await CreateService(newService).unwrap();
      setName("");
      setDescription("");
      setPrice("15");
      setDuration("15");
    } catch (err) {
      if (err instanceof Error) setMessage(err?.message);
      console.error(err);
    }
  };

  const content = (
    <div className="service-form-container">
      <p
        ref={messageRef}
        className={message.length > 0 ? "errorMsg" : "offscreen"}
      >
        {message}
      </p>
      <form className="service-form" onSubmit={handleSubmit}>
        <label className="offscreen" htmlFor="name">
          Nom
        </label>
        <input
          type="text"
          className="input"
          id="name"
          autoComplete="off"
          placeholder="Nom du Service"
          ref={nameRef}
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value.toLowerCase().trim())
          }
        />
        <label htmlFor="description" className="offscreen">
          Description
        </label>
        <textarea
          id="description"
          className="textarea"
          autoComplete="off"
          placeholder="Description du Service"
          value={description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value.trim())
          }
        ></textarea>
        <ServiceParams
          price={price}
          setPrice={setPrice}
          duration={duration}
          setDuration={setDuration}
          method={method}
          setMethod={setMethod}
          categorie={categorie}
          setCategorie={setCategorie}
        />
        <button className="btn" disabled={isValid ? false : true}>
          Create Service
        </button>
      </form>
    </div>
  );

  return content;
};

export default CreateService;
