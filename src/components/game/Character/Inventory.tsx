import { INVENTORY_SIZE, useCharacterStore } from "../../../stores/characterStore";
import InventoryBox from "./InventoryBox";
import './Inventory.css'

export default function Inventory() {

    const { inventory } = useCharacterStore()
    
    return (
        <div className="inventory-section">
            <div className="inventory-grid">
                {Array.from({ length: INVENTORY_SIZE }, (_, index) => {
                    const slot = inventory[index];
                    return (
                        <InventoryBox
                            key={index}
                            slot={slot || { item: null, quantity: 0 }}
                            index={index}
                        />
                    );
                })}
            </div>
        </div>
    )
}