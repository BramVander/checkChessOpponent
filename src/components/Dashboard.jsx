import DatePicker from "./MonthPicker";

import { useChess } from "../Context/ChessContext";
import styles from "./Dashboard.module.css";
import TitleBadge from "./UI/TitleBadge.jsx";
import Collapsable from "./UI/Collapsable.jsx";

function Dashboard() {
  const { opponents, player, cheaters, streamers } = useChess();

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

  function renderList(list, msg) {
    // Check if data is empty
    if (list.length === 0) {
      return <p>{msg}</p>;
    }

    return list.map((game, i) => (
      <Collapsable
        key={i}
        username={game.username}
        twitch={game.twitch}
        gameUrls={game.gameUrls}
      >
        hi
      </Collapsable>
    ));
  }

  const lastOnline = calcDate(player.last_online);
  const accountCreated = calcDate(player.joined);

  return (
    <>
      <div className={styles.ui}>
        <div className={styles.intro}>
          <img className={styles.avatar} src={player.avatar} />
          <p>
            Track opponents <strong>{player.username}</strong>{" "}
            {player.title && <TitleBadge rank={player.title} />} played against
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

      {opponents && (
        <h2>
          Found {opponents.length} opponents, of which{" "}
          {opponents.filter((opp) => opp.isCheater).length} cheaters and{" "}
          {opponents.filter((opp) => opp.isStreamer).length} streamers
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
