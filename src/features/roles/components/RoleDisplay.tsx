import { useEffect, useState } from "react";
import { useGetRolesByStoreQuery } from "../rolesSlice";
import Role from "./Role";
import CreateRole from "./CreateRole";

const storeNum = "1234";

const RoleDisplay = () => {
  const { data: roleData, isError, error } = useGetRolesByStoreQuery(storeNum);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (isError) {
      console.error(error);
    }
  }, [isError, error]);

  const content = (
    <div className="role-container">
      <button className="btn" onClick={() => setDisplay(true)}>
        Nouveau Role
      </button>
      {roleData?.ids &&
        roleData.ids.map((id) => (
          <Role key={id} role={roleData.entities[id]} />
        ))}
      <CreateRole display={display} setDisplay={setDisplay} />
    </div>
  );
  return content;
};

export default RoleDisplay;
