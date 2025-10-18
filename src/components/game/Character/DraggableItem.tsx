import { useSortable } from '@dnd-kit/sortable'
import type { Accessory, Armor, Consumable, Rarity, Weapon } from '../../../types/inventory.types'
import './DraggableItem.css'
import { CSS } from '@dnd-kit/utilities';
import { ITEM_IMAGES } from '../../../utils/data/items/starterGear';

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
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className='draggableItem'
        >
            <img src={itemImage} alt={item.name} className={`draggableItem-img ${rarity}`} />
        </div>
    )
}