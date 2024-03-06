import styles from "./Loader.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

function Loader() {
  const items = Array.from({ length: 12 }, (_, index) => index + 1);

  return (
    <>
      <div className={styles.warning}>
        <FontAwesomeIcon icon={faCircleExclamation} /> &nbsp;
        <h2 className={styles.loadingmsg}>Can take up to 1 minute </h2>&nbsp;
        <FontAwesomeIcon icon={faCircleExclamation} />
      </div>
      <p>
        More opponents played = longer loading time. <br />
        Meanwhile, stare at this beautiful loader.
      </p>
      <div className={styles.container}>
        <div className={styles.loader}>
          <ul className={styles.list}>
            {items.map((i) => (
              <li key={i} className={styles.item} style={{ "--i": i }}>
                <div className={styles.circle}></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Loader;
