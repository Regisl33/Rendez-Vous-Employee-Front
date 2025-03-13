import { useEffect } from "react";
import { useGetRolesByStoreQuery } from "../rolesSlice";
import Role from "./Role";

const storeNum = "1234";

const RoleDisplay = () => {
  const { data: roleData, isError, error } = useGetRolesByStoreQuery(storeNum);

  useEffect(() => {
    if (isError) {
      console.error(error);
    }
  }, [isError, error]);

  const content = (
    <div className="role-container">
      {roleData?.ids &&
        roleData.ids.map((id) => (
          <Role key={id} role={roleData.entities[id]} />
        ))}
    </div>
  );
  return content;
};

export default RoleDisplay;
