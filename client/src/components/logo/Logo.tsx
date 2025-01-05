import React from "react";
import styles from "./Logo.module.css";

const Logo: React.FC = () => {
  return (
    <div className={styles.logoContainer}>
      <div className={styles.logo}>
        <span className={styles.iText}>i</span>
        <span className={styles.chofyText}>chofy</span>
        <div className={styles.musicBar}>
          <div className={`${styles.bar} ${styles.bar1}`}></div>
          <div className={`${styles.bar} ${styles.bar2}`}></div>
          <div className={`${styles.bar} ${styles.bar3}`}></div>
          <div className={`${styles.bar} ${styles.bar4}`}></div>
          <div className={`${styles.bar} ${styles.bar5}`}></div>
        </div>
      </div>
    </div>
  );
};

export default Logo;
