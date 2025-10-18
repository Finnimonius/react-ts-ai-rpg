import { useDroppable } from "@dnd-kit/core";
import type { Equipment } from "../../../types/inventory.types";
import './EquipmentSlot.css'

export default function EquipmentSlot({ slotType, children }: { slotType: keyof Equipment, children?: React.ReactNode; }) {
  const { setNodeRef } = useDroppable({ id: `equipment-${slotType}` });

  const slotNames: Record<keyof Equipment, string> = {
    weapon_main: 'Оружие',
    weapon_off: 'Оружие', 
    helmet: 'Шлем',
    chest: 'Нагрудник',
    gloves: 'Перчатки',
    legs: 'Штаны',
    boots: 'Обувь',
    ring_1: 'Кольцо',
    ring_2: 'Кольцо',
    amulet: 'Амулет'
  };

  const slotName = slotNames[slotType];

  return (
    <div ref={setNodeRef} className='equipment-slot' data-slot={slotType}>
      {children || <div className="slot-placeholder">{slotName}</div>}
    </div>
  )
}