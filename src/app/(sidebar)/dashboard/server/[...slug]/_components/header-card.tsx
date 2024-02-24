import { LucideIcon } from "lucide-react";

import Box from "@/components/box";

import { HeaderCardStat } from "./header-card-stat";

interface HeaderCardsProps {
  label: string;
  icon: LucideIcon;
  color: string;
  value: string;
  maxValue: string;
}

export const HeaderCard = ({
  label,
  icon: Icon,
  color,
  value,
  maxValue,
}: HeaderCardsProps) => {
  return (
    <Box className="w-full border border-border p-6 shadow-lg transition-colors hover:bg-accent hover:shadow-none">
      <Icon className={`h-10 w-10 rounded-full p-2 ${color}`} />
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{label}</h3>
        <HeaderCardStat value={value} maxValue={maxValue} />
      </div>
      <small className="text-muted-foreground">Last 30s</small>
    </Box>
  );
};
