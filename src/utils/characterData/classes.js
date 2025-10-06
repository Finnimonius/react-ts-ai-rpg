import warriorImg from '../../assets/images/characters/classes/warrior.png'
import hunterImg from '../../assets/images/characters/classes/hunter.png'
import banditImg from '../../assets/images/characters/classes/bandit.png'
import witchhunterImg from '../../assets/images/characters/classes/witchhunter.png'
import warlord from '../../assets/images/characters/classes/warlord.png'

export const CLASSES = [
  {
    id: 'warrior',
    name: 'Воин',
    description: 'Мастер ближнего боя, непоколебимый защитник и символ стойкости на поле брани.',
    xp: 0,
    hp: 12,
    primaryAbility: 'strength',
    skills: ['Атлетика', 'Запугивание', 'Выживание', 'Тактика'],
    features: ['Боевая ярость', 'Несокрушимая стойкость', 'Щитовой удар'],
    img: warriorImg 
  },
  {
    id: 'hunter',
    name: 'Охотник',
    description: 'Искусный следопыт и меткий стрелок, чувствующий ритм дикой природы.',
    xp: 0,
    hp: 10,
    primaryAbility: 'dexterity',
    skills: ['Скрытность', 'Выживание', 'Внимание', 'Природа'],
    features: ['Меткий выстрел', 'Следопыт', 'Звериная связь', 'Природная маскировка'],
    img: hunterImg
  },
  {
    id: 'bandit',
    name: 'Бандит',
    description: 'Хитрый и беспринципный боец, мастер нечестных приемов и внезапных нападений.',
    xp: 0,
    hp: 8,
    primaryAbility: 'dexterity',
    skills: ['Обман', 'Ловкость рук', 'Скрытность', 'Запугивание'],
    features: ['Грязный прием', 'Внезапное нападение', 'Быстрое исчезновение', 'Карманная кража'],
    img: banditImg
  },
  {
    id: 'witchhunter',
    name: 'Охотник на ведьм',
    description: 'Безжалостный искатель магических угроз, вооруженный знаниями и стальной волей.',
    xp: 0,
    hp: 8,
    primaryAbility: 'wisdom',
    skills: ['Проницательность', 'Расследование', 'Магия', 'Убеждение'],
    features: ['Магическое сопротивление', 'Разрушение чар', 'Божественный суд', 'Охота на колдунов'],
    img: witchhunterImg
  },
  {
  id: 'warlord',
  name: 'Военачальник',
  description: 'Тактический гений и харизматичный лидер, вдохновляющий союзников на поле боя и координирующий сложные маневры.',
  xp: 0,
  hp: 10,
  primaryAbility: 'charisma',
  skills: ['Тактика', 'Убеждение', 'Запугивание', 'История', 'Атлетика'],
  features: [
    'Боевой приказ',
    'Тактическое превосходство', 
    'Вдохновляющее присутствие',
    'Координация атаки',
    'Стратегическое планирование'
  ],
  img: warlord
}
]