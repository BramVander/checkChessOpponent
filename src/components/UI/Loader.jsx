import styles from "./Loader.module.css";

function Loader() {
  const items = Array.from({ length: 12 }, (_, index) => index + 1);

  return (
    <>
      <h2 className={styles.loadingmsg}>
        This will take more time with more opponents...
      </h2>
      <p>Meanwhile, stare at this beautiful loader</p>
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
