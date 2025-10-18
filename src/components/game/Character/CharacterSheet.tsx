import { useNavigate } from "react-router-dom"
import { useCharacterStore } from "../../../stores/characterStore"
import './CharacterSheet.css'
import DraggableItem from "./DraggableItem"
import { useState } from "react";
import { closestCenter, DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import type { Accessory, Armor, Consumable, Equipment, Weapon } from "../../../types/inventory.types";
import EquipmentSlot from "./EquipmentSlot";
import InventoryBox from "./InventoryBox";
import { ITEM_IMAGES } from "../../../utils/data/items/starterGear";

export default function CharacterSheet() {
    const { reset, equipment, inventory } = useCharacterStore();
    const [activeId, setActiveId] = useState<string | null>(null);
    const navigate = useNavigate();

    const sensors = useSensors(useSensor(PointerSensor));

    const findItemWithSource = (id: string): { item: Weapon | Armor | Accessory | Consumable; source: string } | null => {

        const separatorIndex = id.lastIndexOf('|');
        if (separatorIndex === -1) return null;

        const itemId = id.substring(0, separatorIndex);
        const sourceFromId = id.substring(separatorIndex + 1);

        if (sourceFromId.startsWith('inventory-')) {
            const index = parseInt(sourceFromId.replace('inventory-', ''));
            if (inventory[index]?.item?.id === itemId) {
                return { item: inventory[index].item!, source: sourceFromId };
            }
        } else if (sourceFromId.startsWith('equipment-')) {
            const slot = sourceFromId.replace('equipment-', '') as keyof Equipment;
            if (equipment[slot]?.id === itemId) {
                return { item: equipment[slot]!, source: sourceFromId };
            }
        }

        for (const [slot, item] of Object.entries(equipment)) {
            if (item?.id === itemId) {
                return { item, source: `equipment-${slot}` };
            }
        }

        for (let i = 0; i < inventory.length; i++) {
            if (inventory[i].item?.id === itemId) {
                return { item: inventory[i].item!, source: `inventory-${i}` };
            }
        }

        return null;
    };

    const activeItemData = activeId ? findItemWithSource(activeId) : null;

    const handleDragStart = (event: any) => {
        setActiveId(event.active.id)
    };

    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (!over) {
            setActiveId(null);
            return;
        }

        const activeItemData = findItemWithSource(active.id);

        if (!activeItemData) {
            setActiveId(null);
            return;
        }

        const targetZone = over.id as string;

        handleItemMove(activeItemData, targetZone);

        setActiveId(null);
    };

    const handleItemMove = (draggedItem: { item: Weapon | Armor | Accessory | Consumable; source: string }, targetZone: string) => {

        if (targetZone.startsWith('equipment-')) {
            const equipmentSlot = targetZone.replace('equipment-', '') as keyof Equipment;
            if (canEquipItem(draggedItem.item, equipmentSlot)) {
                moveToEquipment(draggedItem, equipmentSlot);
            }
        } else if (targetZone.startsWith('inventory-')) {
            const inventoryIndex = parseInt(targetZone.replace('inventory-', ''));

            if (inventoryIndex >= 0 && inventoryIndex < inventory.length) {
                const targetSlot = inventory[inventoryIndex];

                if (targetSlot && !targetSlot.item) {
                    moveToInventorySlot(draggedItem, inventoryIndex);
                }
            }
        }
    };

    const canEquipItem = (item: Weapon | Armor | Accessory | Consumable, slot: keyof Equipment): boolean => {
        if (item.type === 'consumable' || item.type === 'material' || item.type === 'quest') {
            return false;
        }

        switch (slot) {
            case 'weapon_main':
            case 'weapon_off':
                return item.type === 'weapon';

            case 'helmet':
            case 'chest':
            case 'gloves':
            case 'legs':
            case 'boots':
                return item.type === 'armor' && (item as Armor).slot === slot;

            case 'ring_1':
            case 'ring_2':
                return item.type === 'accessory' && (item as Accessory).slot?.startsWith('ring');

            case 'amulet':
                return item.type === 'accessory' && (item as Accessory).slot === 'amulet';

            default:
                return false;
        }
    };

    const moveToEquipment = (draggedItem: { item: Weapon | Armor | Accessory | Consumable; source: string }, targetSlot: keyof Equipment) => {
        if (draggedItem.source.startsWith('inventory-')) {
            const fromIndex = parseInt(draggedItem.source.replace('inventory-', ''));
            useCharacterStore.getState().equipItem(fromIndex, targetSlot);
        } else {
            const fromSlot = draggedItem.source.replace('equipment-', '') as keyof Equipment;
            useCharacterStore.getState().swapEquipment(fromSlot, targetSlot);
        }
    };

    const moveToInventorySlot = (draggedItem: { item: Weapon | Armor | Accessory | Consumable; source: string }, targetIndex: number) => {
        if (draggedItem.source.startsWith('equipment-')) {
            const fromSlot = draggedItem.source.replace('equipment-', '') as keyof Equipment;

            if (targetIndex >= 0 && targetIndex < inventory.length && !inventory[targetIndex].item) {
                useCharacterStore.getState().unequipItem(fromSlot, targetIndex);
            }
        }
        else if (draggedItem.source.startsWith('inventory-')) {
            const fromIndex = parseInt(draggedItem.source.replace('inventory-', ''));
            useCharacterStore.getState().moveInventoryItem(fromIndex, targetIndex);
        }
    };

    const handleReset = () => {
        reset()
        navigate('/play')
    };

    return (
        <div className="characterSheet-container">
            <button onClick={handleReset}>Сбросить персонажа</button>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >

                <div className="equipment-section">
                    <div className="equipment-grid">
                        {(Object.keys(equipment) as (keyof Equipment)[]).map((slot) => (
                            <EquipmentSlot key={slot} slotType={slot}>
                                {equipment[slot] && (
                                    <DraggableItem item={equipment[slot]!} location={`equipment-${slot}`} />
                                )}
                            </EquipmentSlot>
                        ))}
                    </div>
                </div>

                <div className="inventory-section">
                    <h3>🎒 Инвентарь</h3>
                    <div className="inventory-grid">
                        {Array.from({ length: 20 }, (_, index) => {
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

                <DragOverlay>
                    {activeItemData ? (
                        <div className="draggableItem overlay">
                            <img
                                src={ITEM_IMAGES[activeItemData.item.img as keyof typeof ITEM_IMAGES]}
                                alt={activeItemData.item.name}
                                className="draggableItem-img"
                            />
                        </div>
                    ) : null}
                </DragOverlay>

            </DndContext>
        </div>
    )
}
