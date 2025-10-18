import { useState } from 'react';
import { 
  DndContext, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragOverlay,
  closestCenter,
  useDroppable
} from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// 🎁 ПЕРЕТАСКИВАЕМЫЙ МЕЧ (для инвентаря)
function DraggableSword() {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: 'sword-1' });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="item"
    >
      ⚔️ Меч
    </div>
  );
}

// 🎪 ЭКИПИРОВАННЫЙ МЕЧ (отдельный перетаскиваемый элемент)
function EquippedSword() {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: 'equipped-sword' });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="item"
    >
      ⚔️ Меч
    </div>
  );
}

// 🎯 СЛОТ ДЛЯ ОРУЖИЯ (простой, без перетаскивания)
function WeaponSlot() {
  const { isOver, setNodeRef } = useDroppable({
    id: 'weapon-slot',
  });

  return (
    <div 
      ref={setNodeRef}
      className={`weapon-slot ${isOver ? 'over' : ''}`}
    >
      {isOver ? '⬇️ Бросьте сюда' : '⚔️ Оружие'}
    </div>
  );
}

// 🎒 ИНВЕНТАРЬ КАК DROP-ЗОНА (ИСПРАВЛЕННЫЙ)
function InventoryArea({ children }) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'inventory-area',
  });

  return (
    <div 
      ref={setNodeRef}
      className={`inventory-area ${isOver ? 'over' : ''}`}
    >
      {children} {/* 🎯 ВОТ ТУТ ДОЛЖНЫ БЫТЬ ДЕТИ */}
    </div>
  );
}

// 🎮 ГЛАВНЫЙ КОМПОНЕНТ
export default function SimpleInventory() {
  const [swordLocation, setSwordLocation] = useState('inventory');
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    setActiveId(null);

    if (!over) return;

    // 🎯 ПРОСТАЯ ЛОГИКА:
    if (active.id === 'sword-1' && over.id === 'weapon-slot') {
      setSwordLocation('equipped');
    } 
    else if (active.id === 'equipped-sword' && over.id === 'inventory-area') {
      setSwordLocation('inventory');
    }
  };

  return (
    <div className="inventory-container">
      <h2>🎮 Инвентарь RPG</h2>
      
      <DndContext 
        sensors={sensors} 
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        
        <div className="equipment-section">
          <h3>⚔️ Экипировка:</h3>
          {swordLocation === 'equipped' ? (
            <EquippedSword />
          ) : (
            <WeaponSlot />
          )}
        </div>

        <div className="inventory-section">
          <h3>🎒 Инвентарь:</h3>
          <InventoryArea>
            {swordLocation === 'inventory' && <DraggableSword />}
          </InventoryArea>
        </div>

        <DragOverlay>
          {activeId ? (
            <div className="item overlay">
              ⚔️ Меч
            </div>
          ) : null}
        </DragOverlay>

      </DndContext>

      <style>{`
        .inventory-container { 
          padding: 20px; 
          max-width: 400px; 
          margin: 0 auto; 
          font-family: Arial; 
        }
        
        /* 🎯 ОДИНАКОВЫЕ РАЗМЕРЫ для предметов и слотов */
        .item {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: 2px solid #5a4b8c;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 14px;
          cursor: grab;
          user-select: none;
        }
        
        .item.overlay {
          cursor: grabbing;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        }
        
        .weapon-slot {
          width: 80px;
          height: 80px;
          border: 2px dashed #8B4513;
          border-radius: 8px;
          background: rgba(139, 69, 19, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #8B4513;
          font-size: 12px;
          text-align: center;
        }
        
        .weapon-slot.over {
          background: rgba(139, 69, 19, 0.3);
          border-color: #5a4b8c;
        }
        
        .inventory-area {
          width: 84px;
          height: 84px;
          border: 2px dashed #666;
          border-radius: 8px;
          background: rgba(0,0,0,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .inventory-area.over {
          background: rgba(0,0,0,0.1);
          border-color: #28a745;
        }
        
        .equipment-section, .inventory-section {
          margin: 25px 0;
        }
        
        h3 {
          margin-bottom: 15px;
          color: #333;
        }
      `}</style>
    </div>
  );
}