import { useState, useEffect } from "react";
import styles from "../styles/components/CountDown.module.css";

import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import CloseIcon from "@material-ui/icons/Close";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { green } from '@material-ui/core/colors';

let countDownTimeOut: NodeJS.Timeout;

export function CountDonw() {
  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const secunds = Math.floor(time % 60);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secundsLeft, secundsRight] = String(secunds)
    .padStart(2, "0")
    .split("");

  function startCountDown() {
    setIsActive(true);
  }

  function resetCountDown() {
    clearTimeout(countDownTimeOut);
    setIsActive(false);
    setTime(0.1 * 60);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countDownTimeOut = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
    }
  }, [isActive, time]);

  return (
    <div>
      <div className={styles.countDownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secundsLeft}</span>
          <span>{secundsRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button disabled className={styles.countDownButton}>
          Ciclo encerrado
          <CheckCircleIcon style={{ fontSize: 28, paddingLeft: 6, color: '#4CD62B'}}/>
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              type="button"
              className={`${styles.countDownButton} ${styles.countDownButtonActive}`}
              onClick={resetCountDown}
            >
              Abandonar Ciclo
              <CloseIcon style={{ fontSize: 28, paddingLeft: 6, paddingTop: 2}} />
            </button>
          ) : (
            <button
              type="button"
              className={styles.countDownButton}
              onClick={startCountDown}
            >
              Iniciar um ciclo
              <ArrowRightIcon fontSize="large" />
            </button>
          )}
        </>
      )}
    </div>
  );
}
