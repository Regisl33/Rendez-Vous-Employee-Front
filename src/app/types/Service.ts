export type AppointementMethod = "online" | "phone" | "none";
export type AppointementCategorie = string;

export type AddService = {
  name: string;
  description: string;
  price: number;
  duration: number;
  appointementMethod: AppointementMethod;
  appointementCategorie: AppointementCategorie;
  baseService?: boolean;
  storeID?: string[];
};

export type ServiceType = {
  _id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  appointementMethod: "online" | "phone" | "none";
  appointementCategorie: " ";
  baseService: boolean;
  storeID?: string[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};
