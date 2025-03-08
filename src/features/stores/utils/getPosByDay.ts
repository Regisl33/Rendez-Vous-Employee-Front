import { Weekdays } from "../types/Store";

const getPosByDay = (day: Weekdays): number => {
  switch (day) {
    case "Lundi":
      return 2;
    case "Mardi":
      return 3;
    case "Mercredi":
      return 4;
    case "Jeudi":
      return 5;
    case "Vendredi":
      return 6;
    case "Samedi":
      return 7;
    case "Dimanche":
      return 1;
  }
};

export default getPosByDay;
