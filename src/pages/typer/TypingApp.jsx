import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetTest,
  startTest,
  submitTest,
  updateTimeLeft,
  updateTypedChars
} from "../../redux/features/typingTestSlice";
import TextDisplay from "./TextDisplay";
import TypingArea from "./TypingArea";
import Timer from "./Timer";
import SpeedStats from "./SpeedStats";
import { Button } from "flowbite-react";

const TypingApp = () => {
  const dispatch = useDispatch();
  const {
    text,
    currentIndex,
    timeLeft,
    isStarted,
    typedChars,
    wpm,
    accuracy,
    isSubmitted,
  } = useSelector((state) => state.typingTest);

  const [hasTimerStarted, setHasTimerStarted] = useState(false);  // Track if timer has started

  // Start the timer when the text area is clicked
  const handleFocus = () => {
    if (!isStarted && !hasTimerStarted) {
      dispatch(startTest());
      setHasTimerStarted(true);
    }
  };

  // Update the typed characters
  const handleType = (value) => {
    if (isStarted) {
      dispatch(updateTypedChars(value));
    }
  };

  // Update the time countdown every second
  useEffect(() => {
    let timer;
    if (isStarted && timeLeft > 0) {
      timer = setInterval(() => {
        dispatch(updateTimeLeft(timeLeft - 1));
      }, 1000);
    }

    if (timeLeft === 0) {
      dispatch(submitTest());  // Auto-submit when time reaches 0
      setHasTimerStarted(false);
    }

    return () => clearInterval(timer);  // Cleanup timer when component unmounts or stops
  }, [isStarted, timeLeft, dispatch]);

  // Handle manual submission of the test
  const handleSubmit = () => {
    dispatch(submitTest());
    setHasTimerStarted(false);  // Stop the timer on submission
  };

  // Handle resetting the test
  const handleReset = () => {
    dispatch(resetTest());
    setHasTimerStarted(false);  // Reset timer and test
  };

  return (
    <div className="mt-8 space-y-4 px-4">
      <h1 className="text-3xl font-semibold mb-5">Typing Speed Tester</h1>
      <TextDisplay text={text} currentIndex={currentIndex} />
      <TypingArea
        onType={handleType}
        isDisabled={isSubmitted}
        onFocus={handleFocus}  // Start the timer on focus
      />
      {hasTimerStarted && (
        <Timer timeLeft={timeLeft} onTimeUp={handleSubmit} />  // Display the timer when started
      )}
      {isSubmitted && <SpeedStats wpm={wpm} accuracy={accuracy} />}
      <div className="flex gap-5">
        <Button color="blue" onClick={handleSubmit} disabled={isSubmitted}>
          Submit Test
        </Button>
        <Button color="failure" onClick={handleReset}>
          Reset Test
        </Button>
      </div>
    </div>
  );
};

export default TypingApp;
