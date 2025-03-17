type DispoType = {
  _id: string;
  startDate: number;
  endDate: number;
  roleID: string;
  services: string[];
  sequenceID?: string;
  active: boolean;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export type CreateDispoReqType = {
  startDate: number;
  endDate: number;
  roleID: string;
  services: string[];
  sequenceID?: string;
};

export type updateDispoType = {
  startDate: number;
  endDate: number;
  roleID: string;
  services: string[];
  sequenceID?: string;
  active: boolean;
  id: number;
};

export default DispoType;
