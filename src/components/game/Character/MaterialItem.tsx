import { Tooltip } from "antd";
import { memo } from "react";

interface MaterialItemProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

export const MaterialItem = memo(({ title, value, icon }: MaterialItemProps) => (
  <Tooltip placement="top" title={title}>
    <div className="character-sheet-material">
      {icon}
      <span className="character-sheet-material-span">{value}</span>
    </div>
  </Tooltip>
));