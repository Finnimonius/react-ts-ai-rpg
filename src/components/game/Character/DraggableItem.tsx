import { useSortable } from '@dnd-kit/sortable'
import type { Accessory, Armor, Consumable, Rarity, Weapon } from '../../../types/inventory.types'
import './DraggableItem.css'
import { CSS } from '@dnd-kit/utilities';
import { ITEM_IMAGES } from '../../../utils/data/items/starterGear';
import { Tooltip } from 'antd';

export default function DraggableItem({ item, location }: { item: Weapon | Armor | Consumable | Accessory; location: string }) {
    const { attributes, listeners, setNodeRef, transform } = useSortable({ id: `${item.id}|${location}` });

    const style = {
        transform: CSS.Transform.toString(transform)
    }

    const itemImage = ITEM_IMAGES[item.img as keyof typeof ITEM_IMAGES]

    const rarityBorder: Record<Rarity, string> = {
        common: 'common',
        uncommon: 'uncommon',
        rare: 'rare',
        epic: 'epic',
        legendary: 'legendary'
    }

    const rarity = rarityBorder[item.rarity]

    return (
            <Tooltip
                classNames={{
                    body: 'my-classname'
                }}
                styles={{
                    body: {
                        border: '2px solid black',
                        borderRadius: 10,
                        padding: 15,
                    }
                }}
                placement="rightTop"
                title={
                    <div className='draggable-box-tooltip' >
                        <h3 className='draggable-tooltip-title'>{item.name}</h3>
                        <p>{item.description}</p>
                        {item.defense && <p>{`Защита: ${item.defense}`}</p>}
                        {item.damage && <p>{`Урон: ${item.damage.min} - ${item.damage.max}`}</p>}
                    </div>
                }
                color='#5d4037' >
                <div
                    ref={setNodeRef}
                    style={style}
                    {...attributes}
                    {...listeners}
                    className='draggableItem'
                >
                    <img src={itemImage} alt={item.name} className={`draggableItem-img ${rarity}`} />
                </div>
            </Tooltip >
    )
}