import {
  Main,
  FormElement,
  FormTitle,
  Label,
  Input,
  BtnBox,
  Button,
} from "../styles/commonStyles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/userSlice";
import { investigate, suspectError } from "../store/suspectSlice";
import Profile from "../components/Features/suspect/Profile";
import Notification from "../components/UI/Notification";

import Modal from "../components/ui/Modal.jsx"

function Homepage() {
  const userError = useSelector((state) => state.user.error);
  const suspect = useSelector((state) => state.suspect.suspect);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("hikaru");

  async function handleLogin(e) {
    e.preventDefault();

    if (!username) return;

    try {
      const res = await fetch(`https://api.chess.com/pub/player/${username}`);
      const infoData = await res.json();

      if (infoData.message) throw new Error(infoData.message);

      const rating = await fetch(
        `https://api.chess.com/pub/player/${username}/stats`
      );
      const ratingData = await rating.json();

      if (ratingData.message) throw new Error(ratingData.message);

      dispatch(login({ info: infoData, rating: ratingData }));
    } catch (error) {
      dispatch(userError(error.message));
    }

    navigate("/dashboard");
  }

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
    <Main>
      {userError && <Notification type="fail" msg={userError} />}

      <FormElement
        style={{
          boxShadow:
            "0 27px 55px 0 rgba(0, 66, 0), 0 17px 17px 0 rgba(0, 0, 0)",
        }}
      >
        <FormTitle>Login</FormTitle>
        <Label>
          Username
          <Input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </Label>

        <BtnBox>
          <Button type="button" title="Login" onClick={handleLogin}>
            Login
          </Button>
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
    </Main>
  );
}

export default Homepage;
