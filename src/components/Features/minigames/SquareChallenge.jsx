import { useState } from "react";
import styles from "./SquareChallenge.module.css";

const ChessNotationChallenge = () => {
  let letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
  // flip the board to play as white
  letters = letters.reverse();
  const boardSquares = [];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      boardSquares.push(letters[row] + (col + 1));
    }
  }

  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [currentNotation, setCurrentNotation] = useState(giveNotation());

  function giveNotation() {
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    const randomNumber = Math.floor(Math.random() * 8) + 1;
    return randomLetter + randomNumber;
  }

  function handleSquareClick(e) {
    const clickedSquare = e.target;
    const original = e.target.style.background;
    const correct = "#7fa650"; // --primary-color rgb(127, 166, 80)
    const incorrect = "#ff6347"; // --error-color rgb(255, 99, 71)

    // guard for doubleclick
    if (original === "rgb(127, 166, 80)" || original === "rgb(255, 99, 71)")
      return;

    if (clickedSquare.dataset.square === currentNotation) {
      clickedSquare.style.background = correct;
      setScore((score) => score + 1);
      localStorage.setItem("score", JSON.stringify({ score: score + 1 })); // Update score storage
    } else {
      clickedSquare.style.background = incorrect;
      setScore(score - 1);
      setMisses((misses) => misses + 1);
      localStorage.setItem(
        "missed",
        // spread old obj, modify .missed
        JSON.stringify({ missed: misses + 1 })
      );
    }

    setCurrentNotation(giveNotation());

    setTimeout(() => {
      clickedSquare.style.background = original;
    }, 500);
  }

  // const hscore = JSON.parse(localStorage.getItem("score")) || 0;
  // const hmissed = JSON.parse(localStorage.getItem("missed")) || 0;

  // const hs = {
  //   score: JSON.parse(localStorage.getItem("score")) || 0,
  //   missed: JSON.parse(localStorage.getItem("missed")) || 0,
  // };

  return (
    <>
      <div className={styles.rules}>
        <p>
          \\ toDo: styling, leave modules for now <br /> Find the target square.
        </p>
        <p className={styles.target}>Target: {currentNotation}</p>
        <p className={styles.score}>Score: {score}</p>
        <p className={styles.misses}>Misses: {misses}</p>
        {/* {hs.score && hs.missed && (
          <p className={styles.highscore}>
            Highscore: {hs.score} with {hs.missed} misses
          </p>
        )} */}
      </div>
      <div className={styles.board}>
        {boardSquares.map((square) => (
          <div
            key={square}
            className={styles.square}
            data-square={square}
            onClick={handleSquareClick}
          ></div>
        ))}
      </div>
    </>
  );
};

export default ChessNotationChallenge;
