import { Card, Header, Button, Avatar, Text } from "../../styles/commonStyles";
import { useSelector } from "react-redux";
import TitleBadge from "../UI/TitleBadge";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function PlayerData() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const player = useSelector((state) => state.user.player);

  function calcDate(timestamp) {
    const miliSec = new Date(timestamp * 1000);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const year = miliSec.getFullYear();
    const month = months[miliSec.getMonth()];
    const day = miliSec.getDate();

    const date = day + " " + month + " " + year;

    return date;
  }

  function handleLogout() {
    dispatch({ type: "RESET_STATE" });
    navigate("/");
  }

  return (
    <Card>
      <Header>{player.profile.name}</Header>
      <Button
        style={{
          backgroundColor: "tomato",
          borderRadius: "5px",
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
        onClick={handleLogout}
      >
        logout
      </Button>
      <Avatar src={player.profile.avatar} alt="Avatar" />
      <Text>
        User: {player.profile.username}{" "}
        {player.profile.title && (
          <TitleBadge rank={player.profile.title}></TitleBadge>
        )}
        <br />
        Fide rating: {player.rating.fide}
        <br />
        Subscription: {player.profile.status}
      </Text>

      <Text>
        Account creation: {calcDate(player.profile.joined)} <br />
        Last online: {calcDate(player.profile.last_online)} <br />
      </Text>
    </Card>
  );
}

export default PlayerData;
