export type AppointementMethod = "online" | "phone" | "none";
export type AppointementCategorie =
  | "Santé de la Bouche"
  | "Santé de la Femme"
  | "Santé de la Peau"
  | "Soin des Yeux"
  | "Santé Digestive"
  | "Santé Voyage"
  | "Santé des Oreilles"
  | "Soin des Pieds"
  | "Cholestérol"
  | "Diabète"
  | "Hypertension"
  | "Vaccination, Injection et Prélevements";

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
  appointementMethod: AppointementMethod;
  appointementCategorie: AppointementCategorie;
  baseService: boolean;
  storeID?: string[];
  createdAt: Date;
  updatedAt: Date;
  id: number;
  __v: number;
};

export type UpdateServiceType = {
  updatedService: ServiceType;
  id: number;
};
