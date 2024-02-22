import { Cpu, Database, MemoryStick } from "lucide-react";

import { NodeData } from "@/types/types";

import { ServerCardItem } from "./server-card-item";

interface ServerCardsProps {
  nodeData: NodeData[];
}

export const ServerCards = ({ nodeData }: ServerCardsProps) => {
  // TODO: Fix potiential bug here, nodeData is an array, so it will never be undefined
  if (!nodeData || nodeData.length === 0) {
    return;
  }

  const { cpu, maxcpu, mem, maxmem, disk, maxdisk } = nodeData[0];

  const cpus = maxcpu;
  const cpuUsage = (cpu * 100).toFixed(2);
  const maxMem = (maxmem / 1024 ** 3).toFixed(2);
  const memoryUsage = ((mem / maxmem) * 100).toFixed(2);
  const maxDisk = (maxdisk / 1024 ** 3).toFixed(2);
  const diskUsage = ((disk / maxdisk) * 100).toFixed(2);

  const cards = [
    {
      label: "CPU Usage",
      icon: Cpu,
      bgColor: "bg-primary",
      value: cpuUsage,
      maxValue: `${cpus} CPU(s)`,
    },
    {
      label: "Memory Usage",
      icon: MemoryStick,
      bgColor: "bg-alert",
      value: memoryUsage,
      maxValue: `${maxMem} GB`,
    },
    {
      label: "Disk Usage",
      icon: Database,
      bgColor: "bg-success",
      value: diskUsage,
      maxValue: `${maxDisk} GB`,
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
          value={card.value}
          maxValue={card.maxValue || "100"}
        />
      ))}
    </>
  );
};
