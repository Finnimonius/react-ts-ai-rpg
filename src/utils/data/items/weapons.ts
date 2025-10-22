import kukri from '../../../assets/images/items/weapons/kukri.png';
import bowie_knife from '../../../assets/images/items/weapons/bowie_knife.png';
import shadow_blade from '../../../assets/images/items/weapons/shadow_blade.png';
import venom_fang from '../../../assets/images/items/weapons/venom_fang.png';
import rogue_dagger from '../../../assets/images/items/weapons/rogue_dagger.png';
import crystal_shard from '../../../assets/images/items/weapons/crystal_shard.png';
import bone_carver from '../../../assets/images/items/weapons/bone_carver.png';

export const WEAPONS = {
    KUKRI: {
    id: 'kukri',
    name: 'Кукри',
    description: 'Изогнутый нож с расширенным лезвием, наносящий глубокие режущие раны.',
    type: 'weapon' as const,
    rarity: 'common' as const,
    value: 10,
    img: kukri,
    requiredLevel: 1,
    damage: { min: 5, max: 9 },
    stats: { strength: 2, dexterity: 1 },
    weaponType: 'dagger'
  },
  ROGUE_DAGGER: {
    id: 'rogue_dagger',
    name: 'Кинжал Разбойника',
    description: 'Надёжный и сбалансированный клинок, проверенный в тысячах уличных драк.',
    type: 'weapon' as const,
    rarity: 'common' as const,
    value: 12,
    img: rogue_dagger,
    requiredLevel: 1,
    damage: { min: 5, max: 10 },
    stats: { dexterity: 1, luck: 1 },
    weaponType: 'dagger'
  },
  BOWIE_KNIFE: {
    id: 'bowie_knife',
    name: 'Нож Боуи',
    description: 'Крепкий охотничий нож с клип-поинтом. Надежен в ближнем бою.',
    type: 'weapon' as const,
    rarity: 'uncommon' as const,
    value: 25,
    img: bowie_knife,
    requiredLevel: 3,
    damage: { min: 6, max: 10 },
    stats: { dexterity: 1 },
    weaponType: 'dagger'
  },
  BONE_CARVER: {
    id: 'bone_carver',
    name: 'Резчик Костей',
    description: 'Грубый нож из заточенной кости древнего существа. Разрывает плоть с ужасающей силой.',
    type: 'weapon' as const,
    rarity: 'uncommon' as const,
    value: 25,
    img: bone_carver,
    requiredLevel: 3,
    damage: { min: 6, max: 10 },
    stats: { strength: 2 },
    weaponType: 'dagger'
  },
  VENOM_FANG: {
    id: 'venom_fang',
    name: 'Ядовитый Клык',
    description: 'Короткий клинок с желобками для яда. Каждый урон отравляет жертву.',
    type: 'weapon' as const,
    rarity: 'rare' as const,
    value: 32,
    img: venom_fang,
    requiredLevel: 4,
    damage: { min: 7, max: 13 },
    stats: { dexterity: 2 },
    weaponType: 'dagger'
  },
  CRYSTAL_SHARD: {
    id: 'crystal_shard',
    name: 'Осколок Кристалла',
    description: 'Острые обломки магического кристалла, пронзающие даже самую прочную броню.',
    type: 'weapon' as const,
    rarity: 'epic' as const,
    value: 50,
    img: crystal_shard,
    requiredLevel: 5,
    damage: { min: 8, max: 12 },
    stats: { intelligence: 2 },
    weaponType: 'dagger'
  },
  SHADOW_BLADE: {
    id: 'shadow_blade',
    name: 'Клинок Теней',
    description: 'Искривлённый кинжал, поглощающий свет. Бесшумно рассекает воздух и плоть.',
    type: 'weapon' as const,
    rarity: 'legendary' as const,
    value: 100,
    img: shadow_blade,
    requiredLevel: 6,
    damage: { min: 10, max: 14 },
    stats: { dexterity: 3 },
    weaponType: 'dagger'
  },
}