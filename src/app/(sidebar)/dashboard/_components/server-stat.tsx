"use client";

import { useEffect, useState } from "react";
import { ProgressCircle } from "@tremor/react";

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
    <div className="flex h-28 items-center justify-center ">
      <ProgressCircle value={percentage} size="xl">
        <span className="text-xl text-primary">{`${num}%`}</span>
      </ProgressCircle>
    </div>
  );
};

export default Progressbar;
