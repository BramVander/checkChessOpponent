import { useChess } from "../Context/ChessContext";
import DatePicker from "./MonthPicker";

import styles from "./Dashboard.module.css";
import styled from "styled-components";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr;
`;

const Link = styled.a`
  color: white;
  background: black;
  text-align: center;
  width: fit-content;
  margin: 0.5rem 0;
  padding: 0.5rem;
`;

function Dashboard() {
  const { games, cheaters, streamers, player } = useChess();

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

  const renderList = (data, msg) => {
    // Check if data is empty
    if (data.length === 0) {
      return <p>{msg}</p>;
    }

    return (
      <div>
        {data.map((item, index) => (
          <FormRow key={index}>
            <Link href={item.gameUrl} target="_blank">
              Game vs {item.username}
            </Link>
            {item.twitch && (
              <Link href={item.twitch} target="_blank">
                {item.twitch}
              </Link>
            )}
          </FormRow>
        ))}
      </div>
    );
  };

  const lastOnline = calcDate(player.last_online);
  const accountCreated = calcDate(player.joined);

  return (
    <>
      <div className={styles.ui}>
        <div className={styles.intro}>
          <img className={styles.avatar} src={player.avatar} />
          <p>
            Track opponents <strong>{player.username}</strong> played against{" "}
            <br></br>
            Find <strong>cheaters</strong> on the wall of shame &<br></br>
            Find <strong>streamers</strong> in the hall of fame
          </p>
        </div>

        <p>
          Account creation: {accountCreated} <br></br>
          Last online: {lastOnline} <br></br>
          Subscription: {player.status}
        </p>
        <label>Select a month</label>
        <DatePicker></DatePicker>
      </div>

      {games.length > 0 && (
        <h2>
          Found {games.length} opponents, of which {cheaters.length} cheaters
          and {streamers.length} streamers
        </h2>
      )}

      <div className={styles.results}>
        <div className={styles.box + " " + styles.cheaters}>
          <h2>Wall of shame</h2>
          {renderList(cheaters, "No Cheaters found")}
        </div>
        <div className={styles.box + " " + styles.streamers}>
          <h2>Hall of fame</h2>
          {renderList(streamers, "No Streamers found")}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
