import { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import { useCreateServiceMutation } from "../serviceSlice";
import {
  AddService,
  AppointementCategorie,
  AppointementMethod,
} from "../../../types/Service";
import { RiArrowDropDownLine } from "react-icons/ri";

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
  "Vaccination, Injection et Prélevements",
];

const CreateService = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("0");
  const [duration, setDuration] = useState<string>("10");
  const [method, setMethod] = useState<AppointementMethod>("online");
  const [categorie, setCategorie] = useState<AppointementCategorie>(
    "Vaccination, Injection et Prélevements"
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
      setPrice("");
      setDuration("");
    } catch (err) {
      if (err instanceof Error) setMessage(err?.message);
      console.error(err);
    }
  };

  const content = (
    <main className="service-form-container">
      <h1>Create Your Personalized Services</h1>
      <p ref={messageRef} className={message.length > 0 ? "" : "offscreen"}>
        {message}
      </p>
      <form className="service-form" onSubmit={handleSubmit}>
        <label className="offscreen" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          className="input"
          id="name"
          autoComplete="off"
          placeholder="Service Name"
          ref={nameRef}
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value.trim())
          }
        />
        <label htmlFor="description" className="offscreen">
          Description
        </label>
        <textarea
          id="description"
          autoComplete="off"
          placeholder="Enter the description of your service"
          value={description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value.trim())
          }
        ></textarea>
        <label htmlFor="price" className="offscreen">
          Price
        </label>
        <input
          type="text"
          id="price"
          className="input"
          autoCapitalize="off"
          placeholder="price"
          value={price}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPrice(e.target.value.trim())
          }
        />
        <span>$</span>
        <label htmlFor="duration" className="offscreen">
          Duration
        </label>
        <input
          type="text"
          id="duration"
          className="input"
          autoCapitalize="off"
          placeholder="duration"
          value={duration}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDuration(e.target.value.trim())
          }
        />
        <span>Min</span>
        <div className="select-custom select-method">
          {method} <RiArrowDropDownLine />
        </div>
        <ul>
          {methods.map((m: AppointementMethod) => (
            <li key={m} onClick={() => setMethod(m)}>
              {m}
            </li>
          ))}
        </ul>
        <div className="select-custom select-category">
          {categorie} <RiArrowDropDownLine />
        </div>
        <ul>
          {categories.map((c: AppointementCategorie) => (
            <li key={c} onClick={() => setCategorie(c)}>
              {c}
            </li>
          ))}
        </ul>
        <button className="btn" disabled={isValid ? false : true}>
          Create Service
        </button>
      </form>
    </main>
  );

  return content;
};

export default CreateService;
