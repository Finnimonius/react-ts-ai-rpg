import { useDroppable } from "@dnd-kit/core";
import type { Equipment } from "../../../types/inventory.types";
import './EquipmentSlot.css'

export default function EquipmentSlot({slotType, children}: {slotType: keyof Equipment, children?: React.ReactNode;}) {
   const { setNodeRef } = useDroppable({id: `equipment-${slotType}`});

   return (
    <div ref={setNodeRef} className="equipment-slots">
        {children || <div className="equipment-slot">{slotType}</div>}
    </div>
   )
}