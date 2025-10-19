import { useNavigate } from "react-router-dom"
import { useCharacterStore } from "../../../stores/characterStore"
import './CharacterSheet.css'
import DraggableItem from "./DraggableItem"
import { useState } from "react";
import { closestCenter, DndContext, DragOverlay, PointerSensor, useSensor, useSensors, type DragStartEvent, type DragEndEvent, } from "@dnd-kit/core";
import type { Accessory, Armor, Consumable, Equipment, Weapon } from "../../../types/inventory.types";
import EquipmentSlot from "./EquipmentSlot";
import { ITEM_IMAGES } from "../../../utils/data/items/starterGear";
import { canEquipItem } from "../../../utils/generators/items-builder";
import { ConfigProvider, Divider, Progress } from 'antd';
import Inventory from "./Inventory";
import Stats from "./CombatStats";

export default function CharacterSheet() {
    const { reset,
        equipment,
        inventory,
        equipItem,
        swapEquipment,
        unequipItem,
        moveInventoryItem,
        selectedClass,
        level
    } = useCharacterStore();
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

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id.toString())
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) {
            setActiveId(null);
            return;
        }

        const activeItemData = findItemWithSource(active.id.toString());

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

    const moveToEquipment = (draggedItem: { item: Weapon | Armor | Accessory | Consumable; source: string }, targetSlot: keyof Equipment) => {
        if (draggedItem.source.startsWith('inventory-')) {
            const fromIndex = parseInt(draggedItem.source.replace('inventory-', ''));
            equipItem(fromIndex, targetSlot);
        } else {
            const fromSlot = draggedItem.source.replace('equipment-', '') as keyof Equipment;
            swapEquipment(fromSlot, targetSlot);
        }
    };

    const moveToInventorySlot = (draggedItem: { item: Weapon | Armor | Accessory | Consumable; source: string }, targetIndex: number) => {
        if (draggedItem.source.startsWith('equipment-')) {
            const fromSlot = draggedItem.source.replace('equipment-', '') as keyof Equipment;

            if (targetIndex >= 0 && targetIndex < inventory.length && !inventory[targetIndex].item) {
                unequipItem(fromSlot, targetIndex);
            }
        }
        else if (draggedItem.source.startsWith('inventory-')) {
            const fromIndex = parseInt(draggedItem.source.replace('inventory-', ''));
            moveInventoryItem(fromIndex, targetIndex);
        }
    };

    const handleReset = () => {
        reset()
        navigate('/play')
    };

    return (
        <div className="characterSheet-container">
            <div className="ui-element1"></div>
            <div className="ui-element2"></div>
            <div className="ui-element3"></div>
            <div className="ui-element4"></div>
            <div className="ui-element5"></div>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                {/* <button onClick={handleReset} >Сбросить персонажа</button> */}

                <div className="divider-wrapper">
                    <Divider style={{ borderColor: 'white', color: 'white', margin: 0, fontFamily: 'Cormorant', fontSize: '1.9vh' }}>{selectedClass?.name}</Divider>
                    <div className="character-level-wrapper">
                        <span>Ур: {level}</span>
                        <div className="ui-element-level"></div>
                    </div>
                </div>

                <div className="equipment-section">
                    <div className="equipment-grid">
                        <img className="character-sheet-img" src={selectedClass?.img} alt="" draggable={false} />
                        {(Object.keys(equipment) as (keyof Equipment)[]).map((slot) => (
                            <EquipmentSlot key={slot} slotType={slot} data-slot={slot}>
                                {equipment[slot] && (
                                    <DraggableItem item={equipment[slot]} location={`equipment-${slot}`} />
                                )}
                            </EquipmentSlot>
                        ))}
                    </div>
                </div>

                {/* <Stats /> */}

                <div className="character-sheet-status-wrapper">
                    <ConfigProvider
                        theme={{
                            components: {
                                Progress: {
                                    colorText: 'white',
                                },
                            },
                        }}
                    >
                        <Progress className="character-sheet-hp" showInfo={false} size={{ height: 6 }} percent={100} strokeColor={'red'} style={{ width: '30rem', color: 'white' }} />
                    </ConfigProvider>
                    <ConfigProvider
                        theme={{
                            components: {
                                Progress: {
                                    colorText: 'white',
                                    colorSuccess: '#1677ff'
                                },
                            },
                        }}
                    >
                        <Progress className="character-sheet-hp" showInfo={false} size={{ height: 6 }} percent={100} style={{ width: '30rem', color: 'white' }} />
                    </ConfigProvider>
                </div>

                <Stats />

                <Inventory />


                <Divider style={{ borderColor: 'white', color: 'white', margin: 0, fontFamily: 'Cormorant', fontSize: 23 }}>.</Divider>


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
