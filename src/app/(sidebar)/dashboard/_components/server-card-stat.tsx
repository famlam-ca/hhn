"use client";

import { ProgressCircle } from "@tremor/react";
interface ServerStatProps {
  value: string;
  maxValue: string;
}

export const ServerCardStat = ({ maxValue, value }: ServerStatProps) => {
  const percentage = parseFloat(value);

  return (
    <div className="flex max-h-28 items-center justify-center">
      <ProgressCircle value={percentage} size="xl">
        <p className="flex flex-col items-center">
          <span>{`${value}%`} of</span>
          <span className="text-muted-foreground">{`${maxValue}`}</span>
        </p>
      </ProgressCircle>
    </div>
  );
};
