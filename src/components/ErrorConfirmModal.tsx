import { StatusType } from "../features/roles/types/roles";
import { MdErrorOutline } from "react-icons/md";
import { BsCheck2Circle } from "react-icons/bs";

type propsType = {
  status: StatusType;
  setStatus: React.Dispatch<React.SetStateAction<StatusType>>;
  message: string;
};

const ErrorConfirmModal = ({ status, setStatus, message }: propsType) => {
  const errorModal = (
    <>
      <div style={{ color: "rgb(214, 20, 20)" }}>
        <MdErrorOutline />
      </div>
      <p style={{ color: "rgb(214, 20, 20)" }}>{message}!</p>
      <button
        style={{
          color: "rgb(214, 20, 20)",
          border: "1px solid rgb(214, 20, 20)",
        }}
        className="btn"
        onClick={() => setStatus("active")}
      >
        OK
      </button>
    </>
  );

  const confirmModal = (
    <>
      <div style={{ color: "rgb(9, 224, 37)" }}>
        <BsCheck2Circle />
      </div>
      <p>{message}!</p>
      <button className="btn" onClick={() => window.location.reload()}>
        OK
      </button>
    </>
  );

  const content = (
    <div
      className={
        status === "active"
          ? "display"
          : status === "confirm"
          ? "display-active confirm"
          : "display-active error"
      }
    >
      {status === "confirm" ? confirmModal : errorModal}
    </div>
  );
  return content;
};

export default ErrorConfirmModal;
