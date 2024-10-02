import {
  FormElement,
  FormTitle,
  Label,
  Input,
  BtnBox,
  Button,
} from "../../../styles/commonStyles";
import { useState } from "react";
import { investigate, suspectError } from "../../../store/suspectSlice";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./Profile";

function Investigate() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("hikaru");
  const suspect = useSelector((state) => state.suspect.suspect);

  async function handleCheck(e) {
    e.preventDefault();

    if (!username) return;

    try {
      const info = await fetch(`https://api.chess.com/pub/player/${username}`);
      const infoData = await info.json();

      if (infoData.message) throw new Error(infoData.message);

      const rating = await fetch(
        `https://api.chess.com/pub/player/${username}/stats`
      );
      const ratingData = await rating.json();

      if (ratingData.message) throw new Error(ratingData.message);

      dispatch(investigate({ info: infoData, rating: ratingData }));
    } catch (error) {
      dispatch(suspectError(error.message));
    }
  }

  return (
    <>
      <div style={{ display: "flex", gap: "3rem" }}>
        <FormElement>
          <FormTitle>Investigate suspect</FormTitle>
          <Label>
            Suspect
            <Input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </Label>

          <BtnBox>
            <Button
              type="button"
              title="Investigate suspicious player"
              onClick={handleCheck}
            >
              Check suspect
            </Button>
          </BtnBox>
        </FormElement>

        {suspect.profile.username && <Profile suspect={suspect} />}
      </div>
    </>
  );
}

export default Investigate;
