import { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import { useCreateServiceMutation } from "../serviceSlice";
import {
  AddService,
  AppointementCategorie,
  AppointementMethod,
} from "../types/Service";
import ServiceParams from "./ServiceParams";
import ServiceTextInput from "./ServiceTextInput";

const CreateService = () => {
  //States
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
  //Refs
  const nameRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);
  //Regex
  const numberRegExp = /[^0-9]/g;
  //Custom Mutation
  const [CreateService] = useCreateServiceMutation();
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
  }, [price, duration]);
  //Check if all the data entered is valid and display an error if needed
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
  //Submit function
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
      setMessage("");
    } catch (err) {
      if (err instanceof Error) setMessage(err?.message);
      console.error(err);
    }
  };

  const nameInput = (
    <>
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
    </>
  );

  const content = (
    <div className="service-form-container">
      <p
        ref={messageRef}
        className={message.length > 0 ? "errorMsg" : "offscreen"}
      >
        {message}
      </p>
      <form className="service-form" onSubmit={handleSubmit}>
        {nameInput}
        <ServiceTextInput
          description={description}
          setDescription={setDescription}
        />
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
