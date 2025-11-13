import noble from '../../assets/images/characters/backgrounds/noble.webp';
import street_urchin from '../../assets/images/characters/backgrounds/street_urchin.webp';
import soldier from '../../assets/images/characters/backgrounds/soldier.webp';
import acolyte from '../../assets/images/characters/backgrounds/acolyte.webp';
import hermit from '../../assets/images/characters/backgrounds/hermit.webp';

export const BACKGROUNDS = [
  {
    id: 'noble',
    name: 'Дворянин',
    description: 'Вы выросли в роскоши, окруженные придворными интригами и политикой. У вас есть связи и образование.',
    img: noble,
    abilityBonuses: { intelligence: 2 },
    features: ['Знатное происхождение'],
  },
  {
    id: 'street_urchin', 
    name: 'Уличный беспризорник',
    description: 'Вы выживали на улицах города, полагаясь на хитрость и скорость. Вы знаете все темные уголки и тайные ходы.',
    img: street_urchin,
    abilityBonuses: { dexterity: 1, luck: 1 },
    features: ['Знание города'],
  },
  {
    id: 'soldier',
    name: 'Солдат',
    description: 'Вы служили в армии и знаете дисциплину, тактику и тяжесть битвы. Старые раны и боевые товарищи - ваше прошлое.',
    img: soldier,
    abilityBonuses: { strength: 1, constitution: 1 },
    features: ['Военная подготовка'],
  },
  {
    id: 'acolyte',
    name: 'Послушник',
    description: 'Вы служили в храме или монастыре, изучая древние тексты и ритуалы. Вера и знания - ваши союзники.',
    img: acolyte,
    abilityBonuses: { wisdom: 1, intelligence: 1 },
    features: ['Религиозное образование'],
  },
  {
    id: 'hermit',
    name: 'Отшельник', 
    description: 'Вы долгое время жили в уединении, изучая природу и древние тайны. Теперь вы возвращаетесь в мир с новыми знаниями.',
    img: hermit,
    abilityBonuses: { dexterity: 1, constitution: 1 },
    features: ['Выживание в дикой природе'],
  }
] as const;