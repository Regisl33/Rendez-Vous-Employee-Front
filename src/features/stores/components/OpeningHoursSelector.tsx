import { useState, useEffect } from "react";
import { OpeningHoursType, DayOptions } from "../types/Store";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Hours } from "../data/Hours";
import displayHours from "../utils/displayHours";
import OpeningDay from "./OpeningDay";

type propsType = {
  openingHours: OpeningHoursType;
  setOpeningHours: React.Dispatch<React.SetStateAction<OpeningHoursType>>;
};

const OpeningHoursSelector = ({ openingHours, setOpeningHours }: propsType) => {
  const [globalOpen, setGlobalOpen] = useState<DayOptions>(0);
  const [globalClose, setGlobalClose] = useState<DayOptions>(0);
  const [isWeekChecked, setIsWeekChecked] = useState(false);
  const [isWeekendChecked, setIsWeekendChecked] = useState(false);

  useEffect(() => {
    let tempHourArray: OpeningHoursType = [...openingHours];
    if (isWeekChecked && isWeekendChecked) {
      for (let i = 0; i < 7; i++) {
        tempHourArray[i].open = globalOpen;
        tempHourArray[i].close = globalClose;
      }
      setOpeningHours(tempHourArray);
    } else if (isWeekChecked) {
      let newTempArray = tempHourArray.filter(
        (day) => day.day !== "Dimanche" || "Samedi"
      );
      let hoursBackup = tempHourArray.filter(
        (day) => day.day === "Dimanche" || "Samedi"
      );
      for (let i = 0; i < 5; i++) {
        newTempArray[i].open = globalOpen;
        newTempArray[i].close = globalClose;
      }
      let newArray = [...hoursBackup, ...newTempArray].sort(
        (a, b) => a.pos - b.pos
      );
      setOpeningHours(newArray);
    } else if (isWeekendChecked) {
      let newTempArray = tempHourArray.filter(
        (day) => day.day === "Dimanche" || "Samedi"
      );
      let hoursBackup = tempHourArray.filter(
        (day) => day.day !== "Dimanche" || "Samedi"
      );
      for (let i = 0; i < 5; i++) {
        newTempArray[i].open = globalOpen;
        newTempArray[i].close = globalClose;
      }
      let newArray = [...hoursBackup, ...newTempArray].sort(
        (a, b) => a.pos - b.pos
      );
      setOpeningHours(newArray);
    }
  }, [isWeekChecked, isWeekendChecked]);

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
  const openCustomSelect = (
    <div className="select-open-container">
      <label htmlFor="custom-select-open" className="offscreen">
        Ouvre :
      </label>
      <div className="select-custom select-open" id="custom-select-open">
        {globalOpen} <RiArrowDropDownLine />
        <ul>
          {Hours.map((hour: DayOptions) => (
            <li key={hour} onClick={() => setGlobalOpen(hour)}>
              {displayHours(hour)}
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
        {globalClose} <RiArrowDropDownLine />
        <ul>
          {Hours.map((hour: DayOptions) => (
            <li key={hour} onClick={() => setGlobalClose(hour)}>
              {displayHours(hour)}
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
      {openCustomSelect}
      {closeCustomSelect}
      {openingHours.map((day) => (
        <OpeningDay
          key={day.day}
          day={day}
          openingHours={openingHours}
          setOpeningHours={setOpeningHours}
        />
      ))}
    </div>
  );
  return content;
};

export default OpeningHoursSelector;
