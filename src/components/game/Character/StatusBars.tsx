import { ConfigProvider, Progress } from "antd";
import './StatusBars.css'
import { useCharacterStore } from "../../../stores/characterStore";

export default function StatusBars() {
    const { derivedStats } = useCharacterStore()

    return (
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
                <Progress
                    className="character-sheet-hp"
                    size={{ height: 6 }}
                    percent={(derivedStats.maxHealth / derivedStats.health) * 100}
                    strokeColor={'red'}
                    style={{ width: '35vh', color: 'white', fontSize: '1.2vh', fontWeight: 600 }}
                    format={() => `${derivedStats.health} / ${derivedStats.maxHealth}`}
                />
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
                <Progress
                    className="character-sheet-hp"
                    size={{ height: 6 }}
                    percent={(derivedStats.maxMana / derivedStats.mana) * 100}
                    style={{ width: '35vh', color: 'white', fontSize: '1.2vh', fontWeight: 600 }}
                    format={() => `${derivedStats.mana} / ${derivedStats.maxMana}`}
                />
            </ConfigProvider>
        </div>
    )
}