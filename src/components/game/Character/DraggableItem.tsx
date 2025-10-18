import { useSortable } from '@dnd-kit/sortable'
import type { Accessory, Armor, Consumable, Weapon } from '../../../types/inventory.types'
import './DraggableItem.css'
import { CSS } from '@dnd-kit/utilities';
import { ITEM_IMAGES } from '../../../utils/data/items/starterGear';

export default function DraggableItem({ item }: { item: Weapon | Armor | Consumable | Accessory }) {
    const { attributes, listeners, setNodeRef, transform } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform)
    }

    const itemImage = ITEM_IMAGES[item.img as keyof typeof ITEM_IMAGES]

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className='draggableItem'
        >
            <img src={itemImage} alt={item.name} className='draggableItem-img'/>
        </div>
    )
}