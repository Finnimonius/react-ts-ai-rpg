import { useCharacterStore } from "../../../stores/characterStore"
import './CharacterSheet.css'
import DraggableItem from "./DraggableItem"
import { useState } from "react";
import { closestCenter, DndContext, DragOverlay, PointerSensor, useSensor, useSensors, type DragStartEvent, type DragEndEvent, } from "@dnd-kit/core";
import type { Accessory, Armor, Consumable, Equipment, Weapon } from "../../../types/inventory.types";
import EquipmentSlot from "./EquipmentSlot";
import { ITEM_IMAGES } from "../../../utils/data/items/starterGear";
import { canEquipItem } from "../../../utils/generators/items-builder";
import { Divider, Tooltip } from 'antd';
import Inventory from "./Inventory";
import Stats from "./CombatStats";
import StatusBars from "./StatusBars";
import Materials from "./Materials";
import useNotification from "antd/es/notification/useNotification";
import { ExclamationCircleOutlined } from '@ant-design/icons';

export default function CharacterSheet() {
    const {
        equipment,
        inventory,
        equipItem,
        swapEquipment,
        unequipItem,
        moveInventoryItem,
        selectedClass,
        currency,
        level
    } = useCharacterStore();
    const [activeId, setActiveId] = useState<string | null>(null);
    const [api, contextHolder] = useNotification();


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

    const showNotification = () => {
        api.info({
        message: 'Недостаточный уровень',
        description: 'Для экипировки этого предмета требуется более высокий уровень!',
        placement: 'topRight',
        duration: 3,
        className: 'custom-notification',
        icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
        closeIcon: null,
    });
    };

    const handleItemMove = (draggedItem: { item: Weapon | Armor | Accessory | Consumable; source: string }, targetZone: string) => {

        if (targetZone.startsWith('equipment-')) {
            const equipmentSlot = targetZone.replace('equipment-', '') as keyof Equipment;
            if (canEquipItem(draggedItem.item, equipmentSlot, level)) {
                moveToEquipment(draggedItem, equipmentSlot);
            } else {
                showNotification()
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

    return (
        <div className="characterSheet-container">
            {contextHolder}
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
                <div className="divider-wrapper">
                    <Divider style={{ borderColor: 'white', color: 'white', margin: 0, fontFamily: 'Cormorant', fontSize: '2.2vh' }}>{selectedClass?.name}</Divider>
                    {/* <div className="character-level-wrapper">
                        <span>Ур: {level}</span>
                        <div className="ui-element-level"></div>
                    </div> */}
                    <div className="character-sheet-currency-wrapper">
                        <Tooltip placement="bottom" title={'Золото'}>
                            <p className="character-sheet-currency-gold">{currency.gold}</p>
                        </Tooltip>
                        <Tooltip placement="bottom" title={'Души'}>
                            <p className="character-sheet-currency-souls">{currency.souls}</p>
                        </Tooltip>
                        <Tooltip placement="bottom" title={'Честь'}>
                            <p className="character-sheet-currency-fame">{currency.fame}</p>
                        </Tooltip>
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

                <StatusBars />
                <Stats />
                <Inventory />
                <Materials />

                <Divider style={{ borderColor: 'white', color: 'white', margin: 0, fontFamily: 'Cormorant', fontSize: 23 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48"><path fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" d="M42.65 34.75v-21.5L24 2.5L5.35 13.25v21.5L24 45.5z" /><path fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" d="m36.31 32.45l6.34-19.2L24 10.59L5.35 13.25l6.34 19.2L24 45.5z" /><path fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" d="M36.31 32.45H11.69L24 10.59zM24 10.59V2.5m12.31 29.95l6.34 2.3m-30.96-2.3l-6.34 2.3" /></svg>
                </Divider>

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
