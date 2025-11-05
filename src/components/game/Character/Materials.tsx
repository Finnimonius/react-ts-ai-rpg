import { Button } from "antd";
import { useCharacterStore } from "../../../stores/characterStore";
import { useMemo, useState } from "react";
import ModalDelete from "./ModalDelete";
import { useNavigate } from "react-router-dom";
import './Materials.css'
import { CrystalsIcon, HerbsIcon, LeatherIcon, OreIcon, RelicsIcon, WoodIcon } from "./icons/MaterialIcons";
import { MaterialItem } from "./MaterialItem";

export default function Materials() {
    const { character, reset } = useCharacterStore()
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const navigate = useNavigate();

    const craftingMaterials = useMemo(() => character?.craftingMaterials || {
        wood: 0, ore: 0, leather: 0, herbs: 0, crystals: 0, relics: 0
    }, [character]);

    const toggleDeleteModal = (open: boolean) => {
        setIsDeleteModalOpen(open);
    };

    const handleReset = () => {
        reset()
        navigate('/play')
    };

    const materialsList = useMemo(() => [
        { title: 'Древесина', value: craftingMaterials.wood, icon: <WoodIcon /> },
        { title: 'Руда', value: craftingMaterials.ore, icon: <OreIcon /> },
        { title: 'Кожа', value: craftingMaterials.leather, icon: <LeatherIcon /> },
        { title: 'Травы', value: craftingMaterials.herbs, icon: <HerbsIcon /> },
        { title: 'Кристаллы', value: craftingMaterials.crystals, icon: <CrystalsIcon /> },
        { title: 'Реликвии', value: craftingMaterials.relics, icon: <RelicsIcon /> },
    ], [craftingMaterials]);

    return (
        <div className="character-sheet-box-materials">
            <div className="character-sheet-materials">
                <div className="character-sheet-materials-wrapper">
                    {materialsList.map(material => (
                        <MaterialItem
                            key={material.title}
                            title={material.title}
                            value={material.value}
                            icon={material.icon}
                        />
                    ))}
                </div>
                <Button onClick={() => toggleDeleteModal(true)} type="primary" danger ghost style={{ fontSize: '1vh', padding: '0.7vh' }}>
                    Удалить персонажа
                </Button>
            </div>
            <ModalDelete
                open={isDeleteModalOpen}
                onCancel={() => toggleDeleteModal(false)}
                onOk={handleReset}
            />
        </div>
    )
}