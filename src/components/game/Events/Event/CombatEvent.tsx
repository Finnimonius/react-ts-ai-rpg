import { ConfigProvider, Progress } from "antd";
import type { GameHistory } from "../../../../types/game.types"
import { ALL_ENEMIES } from "../../../../utils/data/enemies/enemies";
import './CombatEvent.css'
import type { EnemyInstance } from "../../../../types/enemies.types";

interface LocationProp {
    history: GameHistory
}

export default function CombatEvent({ history }: LocationProp) {
    const { aiText, currentEvent } = history;
    const enemy = currentEvent.enemy as EnemyInstance
    const enemyId = currentEvent.enemy?.template.id as keyof typeof ALL_ENEMIES;

    return (
        <div>
            <p className="combat-message-descr">{aiText}</p>
            <div className="combat-enemy-wrapper">
                <img className="combat-img-enemy" src={ALL_ENEMIES[enemyId].img} alt={enemy.template.name} />
                <div className="combat-enemy-info-wrapper">
                    <div>
                        <h3 className="combat-enemy-title">{enemy.template.name}</h3>
                        <p>Уровень: {enemy.level}</p>
                        <p>{enemy.template.description}</p>
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
                                size={{ height: 6 }}
                                percent={(enemy.maxHealth / enemy.currentHealth) * 100}
                                strokeColor={'red'}
                                style={{ width: '35vh', color: 'white', fontSize: '1.2vh', fontWeight: 600, fontFamily: 'AngelusMedieval', }}
                                format={() => `${enemy.currentHealth} / ${enemy.maxHealth}`}
                            />
                        </ConfigProvider>
                    </div>
                </div>
                <div className="combat-enemy-stats">
                    <ul className="combat-list">
                        <li><p>Сила: <span className="combat-item-span">{enemy.stats.strength}</span></p></li>
                        <li><p>Ловкость: <span className="combat-item-span">{enemy.stats.dexterity}</span></p></li>
                        <li><p>Интеллект: <span className="combat-item-span">{enemy.stats.intelligence}</span></p></li>
                        <li><p>Мудрость: <span className="combat-item-span">{enemy.stats.wisdom}</span></p></li>
                        <li><p>Телосложение: <span className="combat-item-span">{enemy.stats.constitution}</span></p></li>
                        <li><p>Удача: <span className="combat-item-span">{enemy.stats.luck}</span></p></li>
                    </ul>
                </div>
            </div>
            <div className="combat-character-wrapper">

            </div>
        </div>
    )
}