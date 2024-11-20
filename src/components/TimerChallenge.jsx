import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

const TimerChallenge = ({ title, targetTime }) => {
  //will be component-instance specific - allows to trigger all challenges separately
  //a let would be shared between all instances - only supporting 1 active timer
  const timer = useRef();
  const dialog = useRef();

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  //clears the interval when the time is up (button has not been pressed - we lost)
  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    dialog.current.open(); // show modal
  }

  function handleReset() {
    setTimeRemaining(targetTime * 1000); // restart the timer
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  }

  //clears the interval when the stop button is pressed  (we won)
  function handleStop() {
    clearInterval(timer.current);
    dialog.current.open(); // show modal
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {" "}
            {timerIsActive ? "Stop" : "Start"} challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : ""}>
          {timerIsActive ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
};

export default TimerChallenge;
