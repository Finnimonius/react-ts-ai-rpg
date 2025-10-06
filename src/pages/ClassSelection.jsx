import { useCharacterStore } from '../stores/characterStore'
import { CLASSES } from "../utils/characterData/classes";
import './ClassSelection.css'

export default function ClassSelection({ onNext }) {
    const { selectClass } = useCharacterStore()

    const handleSelectClass = (classData) => {
        selectClass(classData)
        onNext()
    }

    return (
        <div className='class-container'>
            <ul className='class-list'>
                {CLASSES.map(cls => {
                    return <li onClick={() => handleSelectClass(cls)} key={cls.id} className='class-list-item'>
                        <img src={cls.img} alt="Изображение класса" className='class-img'/>
                        <h3 className='class-title'>{cls.name}</h3>
                        <p className='class-descr'>{cls.description}</p>
                    </li>
                })}
            </ul>
        </div>
    )
}