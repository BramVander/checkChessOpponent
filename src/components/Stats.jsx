import styles from "./Stats.module.css";
import { useChess } from "../Context/ChessContext";

function Stats() {
  const {suspect} = useChess();
  const totalGames = suspect.wins + suspect.losses + suspect.draws;

  return (
    <>
      <p
        style={{
          color: suspect.status.substr(0, 6) !== "closed" ? "#7fa650" : "tomato",
          fontWeight: "900",
          backgroundColor: "black",
          width: "fit-content",
          padding: "1rem",
        }}
      >
        {suspect.status}
      </p>
      {suspect.status.substr(0, 6) !== "closed" ? (
        <div className={styles.container}>
          <div className={styles.box}>
            <label>All time best rapid rating:</label>
            <p>{suspect.rating.best}</p>
            <label>Last rating:</label>
            <p>{suspect.rating.latest}</p>
            <label>Fide rating:</label>
            <p>{suspect.rating.fide}</p>
          </div>

          <div className={styles.box}>
            <label>Winrate:</label>
            <p>{Math.round((suspect.wins / totalGames) * 100) + "%"}</p>
            <label>Wins:</label>
            <p>{suspect.wins}</p>
            <label>losses:</label>
            <p>{suspect.losses}</p>
            <label>Draws:</label>
            <p>{suspect.draws}</p>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Stats;
