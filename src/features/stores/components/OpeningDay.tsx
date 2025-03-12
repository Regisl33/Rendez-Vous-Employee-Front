import { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Hours } from "../data/Hours";
import displayHours from "../utils/displayHours";
import { Day, DayOptions, OpeningHoursType } from "../types/Store";
import getPosByDay from "../utils/getPosByDay";

type propsType = {
  compOpeningHour: OpeningHoursType;
  setCompOpeningHour: React.Dispatch<React.SetStateAction<OpeningHoursType>>;
  day: Day;
};

const OpeningDay = ({
  day,
  setCompOpeningHour,
  compOpeningHour,
}: propsType) => {
  const [open, setOpen] = useState<DayOptions | undefined>(day.open);
  const [close, setClose] = useState<DayOptions | undefined>(day.close);
  const [closed, setClosed] = useState<boolean>(day.closed);
  const [error, setError] = useState(false);

  useEffect(() => {
    setOpen(day.open);
    setClose(day.close);
    setClosed(day.closed);
  }, [day.open, day.close, day.closed]);

  useEffect(() => {
    if (closed) {
      setClose(undefined);
      setOpen(undefined);
      setError(false);
    } else {
      if (open && close && close - open > 0) {
        setError(false);
      } else {
        setError(true);
      }
    }
  }, [open, close, closed]);

  useEffect(() => {
    let hoursBackup: Day[] = [...compOpeningHour].filter(
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
    setCompOpeningHour(newArray);
  }, [open, close, closed]);

  const openCustomSelect = (
    <div className="select-open-container">
      <label htmlFor="custom-select-open" className="offscreen">
        Ouvre :
      </label>
      <div
        className={closed ? "inactive-select" : "select-custom select-open"}
        id="custom-select-open"
      >
        {open ? (
          <>
            {displayHours(open)}
            {":00"} <RiArrowDropDownLine />
          </>
        ) : (
          "--:--"
        )}

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
      <div
        className={closed ? "inactive-select" : "select-custom select-close"}
        id="custom-select-close"
      >
        {close ? (
          <>
            {displayHours(close)}
            {":00"} <RiArrowDropDownLine />
          </>
        ) : (
          "--:--"
        )}

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
      <div className="checkbox-wrapper-30">
        <span className="checkbox">
          <input
            type="checkbox"
            checked={closed}
            onClick={() => setClosed(!closed)}
            onChange={() => console.log(!closed)}
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

  const content = (
    <div
      className={error ? "border-error set-day-container" : "set-day-container"}
      style={{ zIndex: 10 - day.pos }}
    >
      <h2>{day.day}</h2>
      {openCustomSelect}
      <span>À</span>
      {closeCustomSelect}
      {closedCheck}
    </div>
  );
  return content;
};

export default OpeningDay;
