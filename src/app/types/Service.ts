export type AppointementMethod = "online" | "phone" | "none";
export type AppointementCategorie = string;

type Service = {
  name: string;
  description: string;
  price: number;
  duration: number;
  appointementMethod: AppointementMethod;
  appointementCategorie: AppointementCategorie;
  baseService?: boolean;
  storeID?: string[];
};

export default Service;
