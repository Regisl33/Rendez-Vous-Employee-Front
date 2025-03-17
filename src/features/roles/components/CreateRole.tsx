import { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import { color } from "../types/roles";
import { RiArrowDropDownLine } from "react-icons/ri";
import { SlClose } from "react-icons/sl";
import colorData from "../data/colorData";
import displayColorName from "../utils/displayColorName";
import { CreateRoleType, StatusType } from "../types/roles";
import ErrorConfirmModal from "../../../components/ErrorConfirmModal";
import { useCreateRoleMutation } from "../rolesSlice";

const storeNum = "1234";

type propsType = {
  display: boolean;
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateRole = ({ display, setDisplay }: propsType) => {
  const [roleName, setRoleName] = useState("");
  const [color, setColor] = useState<color>("colOpt1");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<StatusType>("active");
  //Refs
  const nameRef = useRef<HTMLInputElement>(null);

  const [createRole] = useCreateRoleMutation();

  //UseRef Effect for Name
  useEffect(() => {
    if (nameRef.current) nameRef.current.focus;
  }, [nameRef]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (roleName.length > 0) {
      let newRole: CreateRoleType = {
        name: roleName,
        store: storeNum,
        color,
      };

      try {
        createRole(newRole).unwrap();
        setMessage(`Le Role: ${roleName} a été créé`);
        setStatus("confirm");
      } catch (err) {
        if (err instanceof Error) {
          setMessage(err.message);
        } else {
          setMessage("Il y a eu une erreur en créant le role");
        }
        setStatus("error");
      }
    } else {
      setMessage("Le role doit avoir un nom");
      setStatus("error");
    }
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
    <div
      className={
        display
          ? "create-role-modal display-active"
          : "create-role-modal display"
      }
    >
      <span>
        <SlClose onClick={() => setDisplay(false)} />
      </span>
      <form className="role-form-container" onSubmit={handleSubmit}>
        {roleInput}
        {customSelectcolors}
        <button className="btn" disabled={status === "active" ? false : true}>
          Créer
        </button>
      </form>
      <ErrorConfirmModal
        status={status}
        setStatus={setStatus}
        message={message}
      />
    </div>
  );

  return content;
};

export default CreateRole;
