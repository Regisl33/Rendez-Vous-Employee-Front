export type DayOptions =
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22;

export type Weekdays =
  | "Lundi"
  | "Mardi"
  | "Mercredi"
  | "Jeudi"
  | "Vendredi"
  | "Samedi"
  | "Dimanche";

export type Day = {
  pos: number;
  day: Weekdays;
  open?: DayOptions;
  close?: DayOptions;
  closed: boolean;
};

export type OpeningHoursType = Day[];

export type Country =
  | "AB"
  | "BC"
  | "PE"
  | "MB"
  | "NB"
  | "NS"
  | "NU"
  | "ON"
  | "QC"
  | "SK"
  | "NL"
  | "YT"
  | "NT";

type StoreType = {
  _id: string;
  storeNumber: string;
  storeName: string;
  storeAdress: string;
  storeCity: string;
  storeCountry: Country;
  storePhone: string;
  roles?: string[];
  openingHours: OpeningHoursType;
  holiday?: Date[];
  parameter: string;
  createNewService: boolean;
  active: boolean;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export type AddStore = {
  storeNumber: string;
  storeName: string;
  storeAdress: string;
  storeCity: string;
  storeCountry: Country;
  storePhone: string;
  openingHours: OpeningHoursType;
};

export type UpdatedStoreType = {
  updatedStore: StoreType;
  id: number;
};
export default StoreType;
