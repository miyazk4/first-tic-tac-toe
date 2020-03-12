import React from "react";
import styles from "./Game.module.scss";
export function GameInfo(props) {
  return (
    <div className={styles.gameInfo}>
      <div className={styles.status}>{props.status}</div>
      <ol className={styles.travelList}>{props.moves}</ol>
    </div>
  );
}
