import { useNavigate } from "react-router-dom";
import RoleType from "../types/roles";

type propsType = {
  role: RoleType;
};

const Role = ({ role }: propsType) => {
  const navigate = useNavigate();
  const content = (
    <div className="role">
      <div>
        <h2>{role.name}</h2>
        <button className="btn" onClick={() => navigate(`/roles/:${role.id}`)}>
          Modifier
        </button>
      </div>
      <span className={role.color}></span>
    </div>
  );
  return content;
};

export default Role;
