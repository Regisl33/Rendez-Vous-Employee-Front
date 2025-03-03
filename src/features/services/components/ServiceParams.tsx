import { ChangeEvent } from "react";
import { displayMethods } from "./CreateService";
import { RiArrowDropDownLine } from "react-icons/ri";
import {
  AppointementMethod,
  AppointementCategorie,
  ServiceParamProps,
} from "../../../types/Service";
import { categories, methods } from "./CreateService";

const ServiceParams = ({
  price,
  setPrice,
  duration,
  setDuration,
  method,
  setMethod,
  categorie,
  setCategorie,
}: ServiceParamProps) => {
  const content = (
    <div className="param-container">
      <div className="grid-container">
        <div className="price-container">
          <label htmlFor="price">Prix:</label>
          <input
            type="text"
            id="price"
            className="input"
            autoComplete="off"
            placeholder="Prix"
            value={price}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPrice(e.target.value.trim())
            }
          />
          <span>$</span>
        </div>
        <div className="duration-container">
          <label htmlFor="duration">Durée du Service:</label>
          <input
            type="text"
            id="duration"
            className="input"
            autoCapitalize="off"
            placeholder="Durée"
            value={duration}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDuration(e.target.value.trim())
            }
          />
          <span>Minutes</span>
        </div>
        <div className="select-method-container">
          <label htmlFor="custom-select-method">
            Méthode pour prendre Rendez-Vous:
          </label>
          <div
            className="select-custom select-method"
            id="custom-select-method"
          >
            {displayMethods(method)} <RiArrowDropDownLine />
            <ul>
              {methods.map((m: AppointementMethod) => (
                <li key={m} onClick={() => setMethod(m)}>
                  {displayMethods(m)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="select-category-container">
        <label htmlFor="custom-select-category">
          Définir la Catégorie du Service:
        </label>
        <div
          className="select-custom select-category"
          id="custom-select-category"
        >
          {categorie} <RiArrowDropDownLine />
          <ul>
            {categories.map((c: AppointementCategorie) => (
              <li key={c} onClick={() => setCategorie(c)}>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
  return content;
};

export default ServiceParams;
