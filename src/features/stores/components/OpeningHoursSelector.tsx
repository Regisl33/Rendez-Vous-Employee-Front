import { useState, useEffect } from "react";
import { OpeningHoursType } from "../types/Store";
import { RiArrowDropDownLine } from "react-icons/ri";

const week = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"] as const;
const weekend = ["Samedi", "Dimanche"] as const;

type weekdays =
  | "Lundi"
  | "Mardi"
  | "Mercredi"
  | "Jeudi"
  | "Vendredi"
  | "Samedi"
  | "Dimanche";

type propsType = {
  openingHours: OpeningHoursType | undefined;
  setOpeningHours: React.Dispatch<
    React.SetStateAction<OpeningHoursType | undefined>
  >;
};

const OpeningHoursSelector = ({ openingHours, setOpeningHours }: propsType) => {
  const [selectedDays, setSelectedDays] = useState<weekdays[]>([]);
  const [selectedDay, setSelectedDay] = useState<weekdays>("Lundi");
  const [isWeekChecked, setIsWeekChecked] = useState(false);
  const [isWeekendChecked, setIsWeekendChecked] = useState(false);

  useEffect(() => {
    if (isWeekChecked && isWeekendChecked) {
      setSelectedDays([...week, ...weekend]);
    } else if (isWeekChecked) {
      setSelectedDays([...week]);
    } else if (isWeekendChecked) {
      setSelectedDays([...weekend]);
    }
  }, [isWeekChecked, isWeekendChecked]);

  useEffect(() => {
    let newArray: weekdays[] = [...selectedDays];
    if (newArray.includes(selectedDay)) {
      setSelectedDays(newArray.filter((day) => day !== selectedDay));
    } else {
      newArray.push(selectedDay);
      setSelectedDays(newArray);
    }
  }, [selectedDay, selectedDays]);

  const weekCheck = (
    <div className="checkbox-container">
      <label htmlFor="weekCheckbox">Semaine</label>
      <div className="checkbox-wrapper-43" id="weekCheckbox">
        <input
          type="checkbox"
          id="cbx-43a"
          checked={isWeekChecked}
          onClick={() => setIsWeekChecked(!isWeekChecked)}
        />
        <label htmlFor="cbx-43a" className="check">
          <svg width="18px" height="18px" viewBox="0 0 18 18">
            <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
            <polyline points="1 9 7 14 15 4"></polyline>
          </svg>
        </label>
      </div>
    </div>
  );
  const weekendCheck = (
    <div className="checkbox-container">
      <label htmlFor="weekendCheckbox">Fin de Semaine</label>
      <div className="checkbox-wrapper-43" id="weekendCheckbox">
        <input
          type="checkbox"
          id="cbx-43b"
          checked={isWeekendChecked}
          onClick={() => setIsWeekendChecked(!isWeekendChecked)}
        />
        <label htmlFor="cbx-43b" className="check">
          <svg width="18px" height="18px" viewBox="0 0 18 18">
            <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
            <polyline points="1 9 7 14 15 4"></polyline>
          </svg>
        </label>
      </div>
    </div>
  );
  const DayCustomSelect = (
    <div className="select-day-container">
      <label htmlFor="custom-select-day">Jours :</label>
      <div className="select-custom select-day" id="custom-select-day">
        {selectedDay} <RiArrowDropDownLine />
        <ul>
          {[...week, ...weekend].map((day: weekdays) => (
            <li key={day} onClick={() => setSelectedDay(day)}>
              {day}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const content = (
    <div className="hours-selector-container">
      {weekCheck}
      {weekendCheck}
      {DayCustomSelect}
    </div>
  );
  return content;
};

export default OpeningHoursSelector;
