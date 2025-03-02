//Precise Method and Categorie String Type
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
  | "Injection et Prélevements";
//Create New Service Type
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
//Full Service Data Type
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
//Update Service Request Type
export type UpdateServiceType = {
  updatedService: ServiceType;
  id: number;
};
//* ********************************************************* *//
//Service Props Type
export type ServicePropsType = {
  service: ServiceType;
};

export type CategoriePropsType = {
  cat: AppointementCategorie;
};

export type ServiceParamProps = {
  price: string;
  setPrice: React.Dispatch<React.SetStateAction<string>>;
  duration: string;
  setDuration: React.Dispatch<React.SetStateAction<string>>;
  method: AppointementMethod;
  setMethod: React.Dispatch<React.SetStateAction<AppointementMethod>>;
  categorie: AppointementCategorie;
  setCategorie: React.Dispatch<React.SetStateAction<AppointementCategorie>>;
};
