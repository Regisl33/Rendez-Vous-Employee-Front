import { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Hours } from "../data/Hours";
import displayHours from "../utils/displayHours";
import { Day, DayOptions, OpeningHoursType } from "../types/Store";
import getPosByDay from "../utils/getPosByDay";

type propsType = {
  openingHours: OpeningHoursType;
  setOpeningHours: React.Dispatch<React.SetStateAction<OpeningHoursType>>;
  day: Day;
};

const OpeningDay = ({ day, setOpeningHours, openingHours }: propsType) => {
  const [open, setOpen] = useState<DayOptions>(day.open);
  const [close, setClose] = useState<DayOptions>(day.close);
  const [closed, setClosed] = useState<boolean>(day.closed);

  useEffect(() => {
    let hoursBackup: Day[] = [...openingHours].filter(
      (storedDay: Day) => storedDay.day !== day.day
    );
    let updatedDay: Day = {
      pos: getPosByDay(day.day),
      day: day.day,
      open,
      close,
      closed,
    };
    let newArray: OpeningHoursType = [...hoursBackup, updatedDay].sort(
      (a, b) => a.pos - b.pos
    );
    setOpeningHours(newArray);
  }, [open, close, closed]);

  const openCustomSelect = (
    <div className="select-open-container">
      <label htmlFor="custom-select-open" className="offscreen">
        Ouvre :
      </label>
      <div className="select-custom select-open" id="custom-select-open">
        {displayHours(open)}
        {":00"} <RiArrowDropDownLine />
        <ul>
          {Hours.map((hour: DayOptions) => (
            <li key={hour} onClick={() => setOpen(hour)}>
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
        {displayHours(close)}
        {":00"} <RiArrowDropDownLine />
        <ul>
          {Hours.map((hour: DayOptions) => (
            <li key={hour} onClick={() => setClose(hour)}>
              {displayHours(hour)}:00
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const closedCheck = (
    <div className="checkbox-container">
      <label htmlFor="closedCheckbox">Fermé</label>
      <div className="checkbox-wrapper-43" id="closedCheckbox">
        <input
          type="checkbox"
          id="cbx-43b"
          checked={closed}
          onClick={() => setClosed(!closed)}
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

  const content = (
    <div className="set-day-container">
      <h2>{day.day}</h2>
      {openCustomSelect}
      {closeCustomSelect}
      {closedCheck}
    </div>
  );
  return content;
};

export default OpeningDay;
