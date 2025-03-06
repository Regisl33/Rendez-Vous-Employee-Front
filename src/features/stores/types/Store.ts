export type DayOptions =
  | 1
  | 2
  | 3
  | 4
  | 5
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
  | 22
  | 23
  | 0;
type Day = {
  open: DayOptions;
  close: DayOptions;
};

export type OpeningHoursType = {
  Dimanche: Day;
  Lundi: Day;
  Mardi: Day;
  Mercredi: Day;
  Jeudi: Day;
  Vendredi: Day;
  Samedi: Day;
};

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

export default StoreType;
