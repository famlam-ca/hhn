"use client";

import { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";

const Progressbar = () => {
  const [num, setNum] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(
      () => setNum(Math.floor(Math.random() * 100 + 1)),
      30000, // 300000 5 min
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
