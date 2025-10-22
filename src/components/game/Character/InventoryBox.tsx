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
                <div className="InventoryBox-empty">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.7vh" height="1.7vh" viewBox="0 0 24 24"><path fill="#000000" d="m19 16l3 3l-2 1l-1 2l-3-3v-1.94l-4-4l-4 4V19l-3 3l-1-2l-2-1l3-3h1.94l4-4l-5.97-5.97L4 7L2 2l5 2l-.97.97L12 10.94l5.97-5.97L17 4l5-2l-2 5l-.97-.97L13.06 12l4 4H19Z"/></svg>
                </div>
            )}
            {slot.item && slot.quantity > 1 && (
                <div className="quantity">{slot.quantity}</div>
            )}
        </div>
    )
}