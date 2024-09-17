import React from 'react';
import { FaRegClock } from 'react-icons/fa';

const Timer = ({ timeLeft }) => {
  return (
    <div className="flex gap-2 items-center font-medium">
      <FaRegClock />
      <p className="text-red-700">Time left: {timeLeft}s</p>
    </div>
  );
};

export default Timer;
