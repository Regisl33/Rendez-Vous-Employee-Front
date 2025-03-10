import { useState } from "react";
import { OpeningHoursType, DayOptions, Day } from "../types/Store";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Hours } from "../data/Hours";
import displayHours from "../utils/displayHours";
import OpeningHours from "./OpeningHours";

type propsType = {
  openingHours: OpeningHoursType;
  setOpeningHours: React.Dispatch<React.SetStateAction<OpeningHoursType>>;
};

const OpeningHoursSelector = ({ openingHours, setOpeningHours }: propsType) => {
  const [globalOpen, setGlobalOpen] = useState<DayOptions>(6);
  const [globalClose, setGlobalClose] = useState<DayOptions>(6);
  const [isWeekChecked, setIsWeekChecked] = useState(false);
  const [isWeekendChecked, setIsWeekendChecked] = useState(false);

  const updateMultipleDay = (dayArray: Day[]): Day[] => {
    let newArray: Day[] = [...dayArray];
    for (let i = 0; i < newArray.length; i++) {
      newArray[i].open = globalOpen;
      newArray[i].close = globalClose;
      newArray[i].closed = false;
    }

    return newArray;
  };

  const handleMultipleUpdate = () => {
    let weekHourArray: OpeningHoursType = [];
    let weekendHourArray: OpeningHoursType = [];

    openingHours.map((day: Day) =>
      day.day === "Dimanche" || day.day === "Samedi"
        ? weekendHourArray.push(day)
        : weekHourArray.push(day)
    );

    if (isWeekChecked && isWeekendChecked) {
      let tempArray = updateMultipleDay([
        ...weekHourArray,
        ...weekendHourArray,
      ]);
      let newArray = tempArray.sort((a, b) => a.pos - b.pos);
      setOpeningHours(newArray);
    } else if (isWeekChecked) {
      let result = updateMultipleDay(weekHourArray);
      console.log(result);
      let newArray = [...result, ...weekendHourArray].sort(
        (a, b) => a.pos - b.pos
      );
      console.log(newArray, 2);
      setOpeningHours(newArray);
    } else if (isWeekendChecked) {
      let result = updateMultipleDay(weekendHourArray);
      console.log(result);
      let newArray = [...result, ...weekHourArray].sort(
        (a, b) => a.pos - b.pos
      );
      console.log(newArray, 3);
      setOpeningHours(newArray);
    }
  };

  const weekCheck = (
    <div className="checkbox-container">
      <label htmlFor="weekCheckbox">Semaine</label>
      <div className="checkbox-wrapper-30">
        <span className="checkbox">
          <input
            type="checkbox"
            checked={isWeekChecked}
            onClick={() => setIsWeekChecked(!isWeekChecked)}
            onChange={() => console.log(!isWeekChecked)}
          />
          <svg>
            <use href="#checkbox-30" className="checkbox"></use>
          </svg>
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
          <symbol id="checkbox-30" viewBox="0 0 22 22">
            <path
              fill="none"
              stroke="currentColor"
              d="M5.5,11.3L9,14.8L20.2,3.3l0,0c-0.5-1-1.5-1.8-2.7-1.8h-13c-1.7,0-3,1.3-3,3v13c0,1.7,1.3,3,3,3h13 c1.7,0,3-1.3,3-3v-13c0-0.4-0.1-0.8-0.3-1.2"
            />
          </symbol>
        </svg>
      </div>
    </div>
  );
  const weekendCheck = (
    <div className="checkbox-container">
      <label htmlFor="weekendCheckbox">Fin de Semaine</label>
      <div className="checkbox-wrapper-30">
        <span className="checkbox">
          <input
            type="checkbox"
            checked={isWeekendChecked}
            onClick={() => setIsWeekendChecked(!isWeekendChecked)}
            onChange={() => console.log(!isWeekendChecked)}
          />
          <svg>
            <use href="#checkbox-30" className="checkbox"></use>
          </svg>
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
          <symbol id="checkbox-30" viewBox="0 0 22 22">
            <path
              fill="none"
              stroke="currentColor"
              d="M5.5,11.3L9,14.8L20.2,3.3l0,0c-0.5-1-1.5-1.8-2.7-1.8h-13c-1.7,0-3,1.3-3,3v13c0,1.7,1.3,3,3,3h13 c1.7,0,3-1.3,3-3v-13c0-0.4-0.1-0.8-0.3-1.2"
            />
          </symbol>
        </svg>
      </div>
    </div>
  );
  const openCustomSelect = (
    <div className="select-open-container">
      <label htmlFor="custom-select-open" className="offscreen">
        Ouvre :
      </label>
      <div className="select-custom select-open" id="custom-select-open">
        {displayHours(globalOpen)}
        {":00"} <RiArrowDropDownLine />
        <ul>
          {Hours.map((hour: DayOptions) => (
            <li key={hour} onClick={() => setGlobalOpen(hour)}>
              {displayHours(hour)}:00
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  const closeCustomSelect = (
    <div className="select-close-container">
      <label htmlFor="custom-select-close" className="offscreen">
        Ferme :
      </label>
      <div className="select-custom select-close" id="custom-select-close">
        {displayHours(globalClose)}
        {":00"} <RiArrowDropDownLine />
        <ul>
          {Hours.map((hour: DayOptions) => (
            <li key={hour} onClick={() => setGlobalClose(hour)}>
              {displayHours(hour)}:00
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const content = (
    <div className="hours-selector-container">
      <div className="multiple-update-form">
        {weekCheck}
        {weekendCheck}
        {openCustomSelect}
        <span>À</span>
        {closeCustomSelect}
      </div>
      <button className="btn" onClick={() => handleMultipleUpdate()}>
        Mettre à Jour
      </button>
      <OpeningHours
        openingHours={openingHours}
        setOpeningHours={setOpeningHours}
      />
    </div>
  );
  return content;
};

export default OpeningHoursSelector;
