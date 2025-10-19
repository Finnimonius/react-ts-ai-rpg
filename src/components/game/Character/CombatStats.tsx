import { useCharacterStore } from '../../../stores/characterStore'
import './CombatStats.css'

export default function Stats() {
    const { derivedStats } = useCharacterStore()

    return (
        <div className="stats-container">
            <div className='stats-box'>
                <div className='ui-stats'></div>
                <div className='stats-combat-wrapper'>
                    <div className='stats-combat-stat'>
                        <p className='stats-descr'>Сила атаки: </p>
                        <span className='stats-combat-num'>{derivedStats.attack}</span>
                    </div>
                    <div className='stats-combat-stat'>
                        <p className='stats-descr'>Защита: </p>
                        <span className='stats-combat-num'>{derivedStats.defense}</span>
                    </div>
                    <div className='stats-combat-stat'>
                        <p className='stats-descr'>Шанс крита: </p>
                        <span className='stats-combat-num'>{derivedStats.critChance}</span>
                    </div>
                    <div className='stats-combat-stat'>
                        <p className='stats-descr'>Уклонение: </p>
                        <span className='stats-combat-num'>{derivedStats.evasion}</span>
                    </div>
                </div>
            </div> 
        </div>
    )
}