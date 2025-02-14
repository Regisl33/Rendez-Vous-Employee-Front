export type AppointementMethod = "online" | "phone" | "none";
export type AppointementCategorie = string;

type AddService = {
  name: string;
  description: string;
  price: number;
  duration: number;
  appointementMethod: AppointementMethod;
  appointementCategorie: AppointementCategorie;
  baseService?: boolean;
  storeID?: string[];
};

export default AddService;
