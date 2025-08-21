import { Primitives } from "@/types";
import IconContainer, { Colors } from "../IconContainer";

export interface UserDetailFieldsProps {
  icon: string;
  color: Colors;
  name: string;
  value: Primitives;
}

export default function UserDetailFields({ icon, color, name, value }: UserDetailFieldsProps) {
  return (
    <div className="flex items-center space-x-3">
      <IconContainer icon={icon} color={color} />
      <div>
        <p className="text-sm font-medium text-gray-500">{name}</p>
        <p className="text-lg font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
