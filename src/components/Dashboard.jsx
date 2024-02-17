import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { useChess } from "../Context/ChessContext";

import styles from "./Dashboard.module.css";

function Dashboard() {
  const [date, setDate] = useState();
  const { user, data, games, cheaters, streamers, fetchOpponents } = useChess();

  function handleClick(e) {
    e.preventDefault();

    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");

    fetchOpponents(year, month);
  }

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
        <img className={styles.avatar} src={data.avatar} />
        <p>Track opponents {user} played against</p>

        <label>Select a month</label>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat={"dd/MM/yyy"}
        />

        <button className={styles.btnCheater} onClick={handleClick}>
          Check history
        </button>
      </div>

      <div className={styles.results}>
        <div className={styles.box}>
          <h2>Cheaters</h2>
          {renderList(cheaters, "No Cheaters found")}
        </div>
        <div className={styles.box}>
          <h2>Streamers</h2>
          {renderList(streamers, "No Streamers found")}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
