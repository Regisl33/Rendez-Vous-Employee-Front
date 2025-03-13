import RoleType from "../types/roles";

type propsType = {
  role: RoleType;
};

const Role = ({ role }: propsType) => {
  const content = (
    <div className="role">
      <h2>{role.name}</h2>
      <span className={role.color}></span>
      <button>Modifier</button>
    </div>
  );
  return content;
};

export default Role;
