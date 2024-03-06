import styles from "./Stats.module.css";

function Stats({ player }) {
  const totalGames = player.wins + player.losses + player.draws;

  return (
    <>
      <p
        style={{
          color: player.status.substr(0, 6) !== "closed" ? "#7fa650" : "tomato",
          fontWeight: "900",
          backgroundColor: "black",
          width: "fit-content",
          padding: "1rem",
        }}
      >
        {player.status}
      </p>
      {player.status.substr(0, 6) !== "closed" ? (
        <div className={styles.container}>
          <div className={styles.box}>
            <label>All time best rapid rating:</label>
            <p>{player.best}</p>
            <label>Last rating:</label>
            <p>{player.last}</p>
            <label>Fide rating:</label>
            <p>{player.fide}</p>
          </div>

          <div className={styles.box}>
            <label>Wins:</label>
            <p>{player.wins}</p>
            <label>losses:</label>
            <p>{player.losses}</p>
            <label>Draws:</label>
            <p>{player.draws}</p>
            <label>Winrate:</label>
            <p>{Math.round((player.wins / totalGames) * 100) + "%"}</p>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Stats;
