import { color } from "../types/roles";

const displayColorName = (color: color) => {
  switch (color) {
    case "colOpt1":
      return "Jaune";
    case "colOpt2":
      return "Rose";
    case "colOpt3":
      return "Orange";
    case "colOpt4":
      return "Rouge";
    case "colOpt5":
      return "Mauve";
    case "colOpt6":
      return "Vert";
    case "colOpt7":
      return "Turquoise";
    case "colOpt8":
      return "Bleu Ciel";
    case "colOpt9":
      return "Bleu";
  }
};

export default displayColorName;
