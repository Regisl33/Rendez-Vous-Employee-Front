import { useNavigate } from "react-router-dom";
import RoleType from "../types/roles";

type propsType = {
  role: RoleType;
};

const Role = ({ role }: propsType) => {
  const navigate = useNavigate();
  const content = (
    <div className="role">
      <h2>{role.name}</h2>
      <span className={role.color}></span>
      <button onClick={() => navigate(`/roles/:${role.id}`)}>Modifier</button>
    </div>
  );
  return content;
};

export default Role;
