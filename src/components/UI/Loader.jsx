import styles from "./Loader.module.css";

function Loader() {
  const items = Array.from({ length: 12 }, (_, index) => index + 1);

  return (
    <>
      <p>This will take more time with more opponents...</p>
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
