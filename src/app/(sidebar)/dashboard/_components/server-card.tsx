import { Cpu, Database, MemoryStick } from "lucide-react";

import { ServerCardItem } from "./server-card-item";

export const ServerCards = () => {
  const cards = [
    {
      label: "CPU Usage",
      icon: Cpu,
      bgColor: "bg-primary",
    },
    {
      label: "Memory Usage",
      icon: MemoryStick,
      bgColor: "bg-alert",
    },
    {
      label: "Disk Usage",
      icon: Database,
      bgColor: "bg-success",
    },
  ];

  return (
    <>
      {cards.map((card) => (
        <ServerCardItem
          key={card.label}
          label={card.label}
          icon={card.icon}
          bgColor={card.bgColor}
        />
      ))}
    </>
  );
};
