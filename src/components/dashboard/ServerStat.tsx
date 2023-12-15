"use client";

import React, { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";

const Progressbar = () => {
  const [num, setNum] = useState<number>(0);

  const generateRandomPercentage = () => {
    return Math.floor(Math.random() * 100 + 1);
  };

  useEffect(() => {
    setNum(generateRandomPercentage());

    const interval = setInterval(
      () => setNum(generateRandomPercentage()),
      300000, // 30 seconds = 30000 // 5 min = 300000
    );

    return () => {
      clearInterval(interval);
    };
  }, []);

  const percentage = num;

  return (
    <div>
      <CircularProgressbar value={percentage} text={`${num}%`} />
    </div>
  );
};

export default Progressbar;
