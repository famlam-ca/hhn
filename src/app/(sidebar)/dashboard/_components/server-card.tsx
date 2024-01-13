import { Cpu, Database, MemoryStick } from "lucide-react";

import { hostData } from "@/server/proxmox";

import { ServerCardItem } from "./server-card-item";

export const ServerCards = async () => {
  try {
    const { cpuinfo, loadavg, memory, rootfs } = await hostData();

    const cpus = cpuinfo.cpus;
    const cpuUsage = parseFloat(loadavg[0]).toFixed(2);
    const maxMem = (memory.total / 1024 ** 3).toFixed(2);
    const memoryUsage = ((memory.used / memory.total) * 100).toFixed(2);
    const maxDisk = (rootfs.total / 1024 ** 3).toFixed(2);
    const diskUsage = ((rootfs.used / rootfs.total) * 100).toFixed(2);

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
            maxValue={card.maxValue}
          />
        ))}
      </>
    );
  } catch (error) {
    console.error(error); // debug
    return <div>Error fetching host data. Please try again later.</div>;
  }
};
