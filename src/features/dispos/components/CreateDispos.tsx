import { FormEvent, useState } from "react";
import { SlClose } from "react-icons/sl";
import { ServiceType } from "../../services/types/Service";

type propsType = {
  display: boolean;
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  roleID: string;
};

const CreateDispos = ({ display, setDisplay, roleID }: propsType) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [services, setServices] = useState<ServiceType[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

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
      <form className="create-dispo-form" onSubmit={handleSubmit}></form>
    </div>
  );

  return content;
};

export default CreateDispos;
