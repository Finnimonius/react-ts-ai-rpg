import { useCharacterStore } from "../../../stores/characterStore";
import InventoryBox from "./InventoryBox";
import './Inventory.css'
import { useMemo } from "react";

export default function Inventory() {
    // const { character } = useCharacterStore();
    const character = useCharacterStore(state => state.character);

    const inventory = useMemo(() => character?.inventory || [], [character]);

    return (
        <div className="inventory-section">
            <div className="inventory-grid">
                {inventory.map((slot, index) => (
                    <InventoryBox
                        key={index}
                        slot={slot}
                        index={index}
                    />
                ))}
            </div>
        </div>
    )
}