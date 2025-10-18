import { useDroppable } from "@dnd-kit/core";
import type { InventorySlot } from "../../../types/inventory.types";
import DraggableItem from "./DraggableItem";

export default function InventoryBox({ slot, index }: { slot: InventorySlot, index: number }) {
    const { setNodeRef } = useDroppable({ id: `inventory-${index}` })
    return (
        <div ref={setNodeRef} className="inventory-box">
            {slot.item ? (
                <DraggableItem item={slot.item} location={`inventory-${index}`}/>
            ) : (
                <div className="InventoryBox-empty">Пусто</div>
            )}
            {slot.item && slot.quantity > 1 && (
                <div className="quantity">{slot.quantity}</div>
            )}
        </div>
    )
}