import { FormEvent, useEffect, useState } from "react";
import { SlClose } from "react-icons/sl";
import { useGetServiceByStoreQuery } from "../../services/serviceSlice";
import { DateTimePicker, renderTimeViewClock } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { RiArrowDropDownLine } from "react-icons/ri";

type propsType = {
  display: boolean;
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  roleID: string;
};

const storeNum = "1234";

const CreateDispos = ({ display, setDisplay, roleID }: propsType) => {
  const [startDate, setStartDate] = useState<dayjs.Dayjs>(dayjs(new Date()));
  const [endDate, setEndDate] = useState<dayjs.Dayjs>(dayjs(new Date()));
  const [services, setServices] = useState<string[]>([]);
  const [displayOpt, setDisplayOpt] = useState(false);

  const {
    data: serviceData,
    isError,
    error,
  } = useGetServiceByStoreQuery(storeNum);

  useEffect(() => {
    if (isError) {
      console.error(error);
    }
  }, [isError, error]);

  const handleService = (id: string) => {
    let newArray: string[] = [];
    if (services.includes(id)) {
      newArray = services.filter((servID) => servID !== id);
    } else {
      newArray = [...services, id];
    }
    setServices(newArray);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const startDateInput = (
    <DateTimePicker
      label="Date de début"
      value={startDate}
      onChange={(newValue) => setStartDate(newValue || startDate)}
      views={["year", "month", "day", "hours", "minutes"]}
      viewRenderers={{
        hours: renderTimeViewClock,
        minutes: renderTimeViewClock,
        seconds: renderTimeViewClock,
      }}
      ampm={false}
    />
  );
  const endDateInput = (
    <DateTimePicker
      label="Date de Fin"
      value={endDate}
      onChange={(newValue) => setEndDate(newValue || endDate)}
      views={["year", "month", "day", "hours", "minutes"]}
      viewRenderers={{
        hours: renderTimeViewClock,
        minutes: renderTimeViewClock,
        seconds: renderTimeViewClock,
      }}
      ampm={false}
    />
  );

  const customSelectMultipleService = (
    <div className="select-services-container">
      <label htmlFor="custom-select-multiple-services" className="offscreen">
        Services Offert:
      </label>
      <div
        className="select-multiple-custom- select-services"
        id="custom-select-multiple-services"
        onClick={() => setDisplayOpt(true)}
      >
        <span>
          Services Offert <RiArrowDropDownLine />
        </span>
        <ul className={displayOpt ? "display-active" : "display"}>
          {serviceData &&
            serviceData.ids.map((id: number) => (
              <li
                style={
                  services.includes(id.toString())
                    ? { background: "rgb(55, 0, 255)" }
                    : { background: "none" }
                }
                key={id}
                onClick={() => handleService(id.toString())}
              >
                {serviceData.entities[id].name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );

  const content = (
    <div
      className={
        display
          ? "create-dispo-modal display-active"
          : "create-dispo-modal display"
      }
    >
      <span>
        <SlClose onClick={() => setDisplay(false)} />
      </span>
      <form className="create-dispo-form" onSubmit={handleSubmit}>
        {startDateInput}
        {endDateInput}
        {customSelectMultipleService}
      </form>
    </div>
  );

  displayOpt &&
    addEventListener("click", (e: MouseEvent) => {
      if (e.target !== document.querySelector(".display/active"))
        setDisplayOpt(false);
    });

  return content;
};

export default CreateDispos;
