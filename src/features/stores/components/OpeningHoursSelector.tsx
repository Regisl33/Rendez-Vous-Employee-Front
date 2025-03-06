import { useState, useEffect } from "react";
import { OpeningHoursType } from "../types/Store";
import { RiArrowDropDownLine } from "react-icons/ri";

const week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;
const weekend = ["Saturday", "Sunday"] as const;

type weekdays =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

const OpeningHoursSelector = () => {
  const [selectedDays, setSelectedDays] = useState<weekdays[]>([]);
  const [selectedDay, setSelectedDay] = useState<weekdays>("Monday");
  const [openingHours, setOpeningHours] = useState<OpeningHoursType>();

  const weekCheck = ();
  const weekendCheck = ();
  const DayCustomSelect = (
    <div className="select-day-container">
      <label htmlFor="custom-select-day">Jours :</label>
      <div className="select-custom select-day" id="custom-select-day">
        {storeCountry} <RiArrowDropDownLine />
        <ul>
          {provinces.map((co: Country) => (
            <li key={co} onClick={() => setStoreCountry(co)}>
              {co}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )

  const content = <div className="hours-selector-container"></div>;
  return content;
};

export default OpeningHoursSelector;
