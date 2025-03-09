import { useEffect, useState } from "react";
import { Day, OpeningHoursType } from "../types/Store";
import OpeningDay from "./OpeningDay";

type propsType = {
  openingHours: OpeningHoursType;
  setOpeningHours: React.Dispatch<React.SetStateAction<OpeningHoursType>>;
};

const OpeningHours = ({ openingHours, setOpeningHours }: propsType) => {
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const element = document.querySelector(".border-error");
    if (element) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [openingHours]);

  const content = (
    <div className="opening-hours-container">
      {openingHours.map((day: Day) => (
        <OpeningDay
          key={day.day}
          day={day}
          openingHours={openingHours}
          setOpeningHours={setOpeningHours}
        />
      ))}
      {isError && (
        <p className="errorMsg">
          Chaque jour doit avoir un horaire valide ou etre fermé !
        </p>
      )}
    </div>
  );

  return content;
};

export default OpeningHours;
