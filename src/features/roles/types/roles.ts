export type color =
  | "colOpt1"
  | "colOpt2"
  | "colOpt3"
  | "colOpt4"
  | "colOpt5"
  | "colOpt6"
  | "colOpt7"
  | "colOpt8"
  | "colOpt9";

type RoleType = {
  _id: string;
  name: string;
  store: string;
  color: color;
  active: boolean;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export type CreateRoleType = {
  name: string;
  store: string;
  color: color;
};

export type UpdateRole = {
  updatedRole: RoleType;
  id: number;
};

export type StatusType = "active" | "error" | "confirm";

export default RoleType;
