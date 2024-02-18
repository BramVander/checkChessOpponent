import { useChess } from "../Context/ChessContext";
import DatePicker from "./MonthPicker";

import styles from "./Dashboard.module.css";

function Dashboard() {
  const { user, data, games, cheaters, streamers } = useChess();

  const renderList = (data, message) =>
    Object.keys(games).length > 0 ? (
      Object.keys(data).length > 0 ? (
        Array.from(data).map((item, index) => <p key={index}>{item}</p>)
      ) : (
        <p>{message}</p>
      )
    ) : null;

  return (
    <>
      <div className={styles.ui}>
        <div className={styles.intro}>
          <img className={styles.avatar} src={data.avatar} />
          <p>
            Track opponents <strong>{user}</strong> played against <br></br>
            Find <strong>cheaters</strong> on the wall of shame &<br></br>Find{" "}
            <strong>streamers</strong> in the hall of fame
          </p>
        </div>

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
