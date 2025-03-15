import { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import { color } from "../types/roles";
import { RiArrowDropDownLine } from "react-icons/ri";
import colorData from "../data/colorData";
import displayColorName from "../utils/displayColorName";

const storeNum = "1234";

const CreateRole = () => {
  const [roleName, setRoleName] = useState("");
  const [color, setColor] = useState<color>("colOpt1");
  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState("");
  //Refs
  const nameRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);

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
  }, [roleName]);
  //Test if the form is Valid
  useEffect(() => {
    if (roleName.length > 0 && message.length === 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [roleName, message]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const roleInput = (
    <>
      <label className="offscreen" htmlFor="role">
        Role
      </label>
      <input
        type="text"
        className="input"
        id="role"
        autoComplete="off"
        placeholder="Nom du Role"
        ref={nameRef}
        value={roleName}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setRoleName(e.target.value.toLowerCase())
        }
      />
    </>
  );

  const customSelectcolors = (
    <div className="select-colors-container">
      <label htmlFor="custom-select-colors">Couleur:</label>
      <div className="select-custom select-colors" id="custom-select-colors">
        {displayColorName(color)} <RiArrowDropDownLine />
        <ul>
          {colorData.map((color: color) => (
            <li key={color} onClick={() => setColor(color)}>
              {displayColorName(color)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const content = (
    <form className="create-role-container" onSubmit={handleSubmit}>
      <p
        ref={messageRef}
        className={message.length > 0 ? "errorMsg" : "offscreen"}
      >
        {message}
      </p>
      {roleInput}
      {customSelectcolors}
      <button className="btn" disabled={isValid}>
        Créer
      </button>
    </form>
  );

  return content;
};

export default CreateRole;
