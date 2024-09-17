// src/components/TypingArea.js
import React, { useState, useEffect } from 'react';

const TypingArea = ({ onType, isDisabled, onFocus }) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    if (isDisabled) {
      setInput('');  // Clear input after the test is submitted or reset
    }
  }, [isDisabled]);

  const handleChange = (e) => {
    if (!isDisabled) {
      setInput(e.target.value);  // Update local input state
      onType(e.target.value);    // Pass input value to parent component
    }
  };

  return (
    <textarea
      value={input}
      onChange={handleChange}
      onFocus={onFocus}  // Start the timer when the text area is clicked
      className="typing-area"
      disabled={isDisabled}
      rows="10"
      cols="50"
      placeholder="Start typing here..."
    />
  );
};

export default TypingArea;
