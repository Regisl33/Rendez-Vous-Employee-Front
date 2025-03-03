import { AppointementMethod } from "../types/Service";

const displayMethods = (m: AppointementMethod): string => {
  switch (m) {
    case "online":
      return "En Ligne";
    case "phone":
      return "Par Téléphone";
    case "none":
      return "Sans-Rendez-Vous";
    default:
      return "Par Téléphone";
  }
};

export default displayMethods;
