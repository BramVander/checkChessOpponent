import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Note = styled.div`
  color: #363636;
  font-weight: 600;
  background: #fff;
  width: fit-content;
  max-width: 350px;
  height: 30px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  font-size: 16px;
  padding: 8px 10px;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
`;

const MsgText = styled.p`
  width: 100%;
`;

function Notification({ type, msg }) {
  return (
    <Note>
      <FontAwesomeIcon
        style={type === "success" ? { color: "lime" } : { color: "tomato" }}
        icon={type === "success" ? faCircleCheck : faCircleXmark}
      />
      <MsgText>&nbsp; {msg}</MsgText>
    </Note>
  );
}

export default Notification;
