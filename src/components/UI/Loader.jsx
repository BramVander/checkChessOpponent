import styles from "./Loader.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

import SquareChallenge from "../minigames/SquareChallenge";
import Error from "./Error";

function Loader() {
  return (
    <>
      <div className={styles.warning}>
        <div className={styles.exclamation}>
          <FontAwesomeIcon icon={faCircleExclamation} />
        </div>
        <Error message={"Can take up to 1 minute(!)"} color={"tomato"} />
        <h2>Meanwhile, play a minigame!</h2>
      </div>
      <SquareChallenge />
    </>
  );
}

export default Loader;
