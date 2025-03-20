import { useEffect, useState, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { useGetRoleByIDQuery } from "../rolesSlice";
import { CiCircleCheck } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import displayColorName from "../utils/displayColorName";
import colorData from "../data/colorData";
import { color } from "../types/roles";
import { RiArrowDropDownLine } from "react-icons/ri";
import CreateDispos from "../../dispos/components/CreateDispos";

const UpdateRole = () => {
  const { roleID } = useParams<{ roleID: string }>();
  const id = roleID ? roleID.slice(1) : undefined;
  const { data: roleData, isError, error } = useGetRoleByIDQuery(id as string);

  const [modifyRoleName, setModifyRoleName] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [color, setColor] = useState<color>("colOpt1");
  const [active, setActive] = useState(true);
  const [display, setDisplay] = useState(true);

  const handleSubmit = () => {};

  //Verify if we got an error and handles it
  useEffect(() => {
    if (!id) console.error("roleID must exist in url");
    if (isError) console.error(error);
    if (roleData) {
      setRoleName(roleData.name);
      setColor(roleData.color);
    }
  }, [roleID, isError, error, roleData]);

  const optTitleInput = modifyRoleName ? (
    <div className="modify-name-container">
      <label className="offscreen" htmlFor="name">
        Nom
      </label>
      <input
        type="text"
        className="input"
        id="name"
        autoComplete="off"
        placeholder="Nom du Role"
        value={roleName}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setRoleName(e.target.value.toLowerCase())
        }
      />
      <span>
        <CiCircleCheck onClick={() => setModifyRoleName(false)} />
      </span>
    </div>
  ) : (
    <h2>
      {roleName}
      <span>
        <FaEdit onClick={() => setModifyRoleName(true)} />
      </span>
    </h2>
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
    <div className="update-role-container">
      {optTitleInput}
      {customSelectcolors}
      <button className="btn" onClick={() => handleSubmit()}>
        Enregistrer
      </button>
      <CreateDispos
        display={display}
        setDisplay={setDisplay}
        roleID={roleID as string}
      />
    </div>
  );

  return content;
};

export default UpdateRole;
