import { useEffect } from "react";
import { useGetRolesByStoreQuery } from "../rolesSlice";
import Role from "./Role";
import { useNavigate } from "react-router-dom";

const storeNum = "1234";

const RoleDisplay = () => {
  const { data: roleData, isError, error } = useGetRolesByStoreQuery(storeNum);

  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      console.error(error);
    }
  }, [isError, error]);

  const content = (
    <div className="role-container">
      <button onClick={() => navigate("/roles/add")}>Nouveau Role</button>
      {roleData?.ids &&
        roleData.ids.map((id) => (
          <Role key={id} role={roleData.entities[id]} />
        ))}
    </div>
  );
  return content;
};

export default RoleDisplay;
