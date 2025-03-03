import { ChangeEvent } from "react";
import { TextAreaPropsType } from "../types/Service";

const ServiceTextInput = ({
  description,
  setDescription,
}: TextAreaPropsType) => {
  const content = (
    <>
      <label htmlFor="description" className="offscreen">
        Description
      </label>
      <textarea
        id="description"
        autoComplete="off"
        className="textarea"
        placeholder="Description du Service"
        value={description}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setDescription(e.target.value.trim())
        }
      ></textarea>
    </>
  );
  return content;
};

export default ServiceTextInput;
