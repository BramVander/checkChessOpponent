import { useState } from "react";
import {
  FormElement,
  FormTitle,
  Label,
  TextArea,
  Button,
} from "../../../styles/commonStyles";
import Notification from "../../UI/Notification";

function Bugreporter() {
  const [error, setError] = useState("");

  function handleReport(e) {
    e.preventDefault();

    setError("This is not working yet");

    try {
      // send email
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <FormElement>
        <FormTitle>Contact the developer</FormTitle>
        {error && <Notification type="fail" msg={error} />}
        <Label>
          Discribe bug or wish
          <TextArea />
        </Label>

        <Label>
          Why use word when screenshot do trick
          <input type="file" />
        </Label>

        <Button
          style={{ display: "flex", alignSelf: "center" }}
          onClick={handleReport}
        >
          Let me know
        </Button>
      </FormElement>
    </div>
  );
}

export default Bugreporter;
