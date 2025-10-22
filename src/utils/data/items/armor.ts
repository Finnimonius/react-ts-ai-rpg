// Шлема
import dreamcatcher_helm from '../../../assets/images/items/armor/dreamcatcher_helm.png';
import sun_weave_hat from '../../../assets/images/items/armor/sun_weave_hat.png';
import wayfarer_trilby from '../../../assets/images/items/armor/wayfarer_trilby.png';
import forest_cowl from '../../../assets/images/items/armor/forest_cowl.png';
import spirit_carver_mask from '../../../assets/images/items/armor/spirit_carver_mask.png';
import twilight_veil from '../../../assets/images/items/armor/twilight_veil.png';

//Нагрудники
import forest_guard from '../../../assets/images/items/armor/forest_guard.png';
import ranger_vest from '../../../assets/images/items/armor/ranger_vest.png';
import nomad_armor from '../../../assets/images/items/armor/nomad_armor.png';
import moonweave_vest from '../../../assets/images/items/armor/moonweave_vest.png';
import dreamwalker_garb from '../../../assets/images/items/armor/dreamwalker_garb.png';
import soulweave_tunic from '../../../assets/images/items/armor/soulweave_tunic.png';
import spirit_binding from '../../../assets/images/items/armor/spirit_binding.png';

// Импорты для перчаток
import hunter_grips from '../../../assets/images/items/armor/hunter_grips.png';
import ancient_rune_bracers from '../../../assets/images/items/armor/ancient_rune_bracers.png';
import forest_bracers from '../../../assets/images/items/armor/forest_bracers.png';
import forest_whisper_gloves from '../../../assets/images/items/armor/forest_whisper_gloves.png';
import soul_weave_gloves from '../../../assets/images/items/armor/soul_weave_gloves.png';
import moon_touch_gauntlets from '../../../assets/images/items/armor/moon_touch_gauntlets.png';
import void_whisper_gloves from '../../../assets/images/items/armor/void_whisper_gloves.png';
import dream_catcher_gloves from '../../../assets/images/items/armor/dream_catcher_gloves.png';

export const ARMOR = {
    // Шлема
    FOREST_COWL: {
        id: 'forest_cowl',
        name: 'Капюшон Лесника',
        description: 'Легкий капюшон, скрывающий владельца в лесной чаще.',
        type: 'armor' as const,
        rarity: 'common' as const,
        value: 15,
        img: forest_cowl,
        requiredLevel: 1,
        defense: 3,
        stats: { dexterity: 1 },
        armorType: 'light',
        slot: 'helmet' as const
    },
    SUN_WEAVE_HAT: {
        id: 'sun_weave_hat',
        name: 'Шляпа Солнечной Пряжи',
        description: 'Соломенная шляпа, сплетенная из лучей заходящего солнца и полевых трав.',
        type: 'armor' as const,
        rarity: 'common' as const,
        value: 15,
        img: sun_weave_hat,
        requiredLevel: 2,
        defense: 3,
        stats: { dexterity: 1 },
        armorType: 'light',
        slot: 'helmet' as const
    },
    WAYFARER_TRILBY: {
        id: 'wayfarer_trilby',
        name: 'Трилби Странника',
        description: 'Элегантная шляпа, хранящая тайны бесконечных дорог и лунных троп.',
        type: 'armor' as const,
        rarity: 'uncommon' as const,
        value: 15,
        img: wayfarer_trilby,
        requiredLevel: 2,
        defense: 3,
        stats: { dexterity: 1 },
        armorType: 'light',
        slot: 'helmet' as const
    },
    SPIRIT_CARVER_MASK: {
        id: 'spirit_carver_mask',
        name: 'Маска Резчика Душ',
        description: 'Древняя маска, вырезанная из древесины священного дерева, способная видеть истинную сущность живых существ.',
        type: 'armor' as const,
        rarity: 'rare' as const,
        value: 15,
        img: spirit_carver_mask,
        requiredLevel: 2,
        defense: 3,
        stats: { dexterity: 1 },
        armorType: 'light',
        slot: 'helmet' as const
    },
    DREAMCATCHER_HELM: {
        id: 'dreamcatcher_helm',
        name: 'Шлем Ловца Снов',
        description: 'Головной убор, защищающий разум от кошмаров и ментальных атак.',
        type: 'armor' as const,
        rarity: 'epic' as const,
        value: 15,
        img: dreamcatcher_helm,
        requiredLevel: 2,
        defense: 3,
        stats: { dexterity: 1 },
        armorType: 'light',
        slot: 'helmet' as const
    },
    TWILIGHT_VEIL: {
        id: 'twilight_veil',
        name: 'Вуаль Сумерек',
        description: 'Таинственная маска, меняющая свой облик при переходе от дня к ночи.',
        type: 'armor' as const,
        rarity: 'legendary' as const,
        value: 15,
        img: twilight_veil,
        requiredLevel: 2,
        defense: 3,
        stats: { dexterity: 1 },
        armorType: 'light',
        slot: 'helmet' as const
    },

    // Нагрудники
    FOREST_GUARD: {
        id: 'forest_guard',
        name: 'Страж Леса',
        description: 'Доспех для тех, кто охраняет природные тропы.',
        type: 'armor' as const,
        rarity: 'uncommon' as const,
        value: 35,
        img: forest_guard,
        requiredLevel: 1,
        defense: 6,
        stats: { dexterity: 2 },
        armorType: 'light',
        slot: 'chest' as const
    },
    RANGER_VEST: {
        id: 'ranger_vest',
        name: 'Жилет Стража',
        description: 'Проверенная защита для защиты границ.',
        type: 'armor' as const,
        rarity: 'uncommon' as const,
        value: 35,
        img: ranger_vest,
        requiredLevel: 1,
        defense: 6,
        stats: { dexterity: 2 },
        armorType: 'light',
        slot: 'chest' as const
    },
    NOMAD_ARMOR: {
        id: 'nomad_armor',
        name: 'Броня Кочевника',
        description: 'Надежный доспех для жизни в дороге.',
        type: 'armor' as const,
        rarity: 'uncommon' as const,
        value: 35,
        img: nomad_armor,
        requiredLevel: 1,
        defense: 6,
        stats: { dexterity: 2 },
        armorType: 'light',
        slot: 'chest' as const
    },
    MOONWEAVE_VEST: {
        id: 'moonweave_vest',
        name: 'Жилет Лунной Пряжи',
        description: 'Доспех, сотканный из лучей полной луны, мерцающий в темноте.',
        type: 'armor' as const,
        rarity: 'uncommon' as const,
        value: 35,
        img: moonweave_vest,
        requiredLevel: 1,
        defense: 6,
        stats: { dexterity: 2 },
        armorType: 'light',
        slot: 'chest' as const
    },
    DREAMWALKER_GARB: {
        id: 'dreamwalker_garb',
        name: 'Одеяние Сновидца',
        description: 'Доспех, созданный из ткани снов, меняющий форму в лунном свете.',
        type: 'armor' as const,
        rarity: 'uncommon' as const,
        value: 35,
        img: dreamwalker_garb,
        requiredLevel: 1,
        defense: 6,
        stats: { dexterity: 2 },
        armorType: 'light',
        slot: 'chest' as const
    },
    SOULWEAVE_TUNIC: {
        id: 'soulweave_tunic',
        name: 'Туника Из Плетения Душ',
        description: 'Доспех, созданный из переплетенных нитей ушедших душ.',
        type: 'armor' as const,
        rarity: 'uncommon' as const,
        value: 35,
        img: soulweave_tunic,
        requiredLevel: 1,
        defense: 6,
        stats: { dexterity: 2 },
        armorType: 'light',
        slot: 'chest' as const
    },
    SPIRIT_BINDING: {
        id: 'spirit_binding',
        name: 'Узы Духов',
        description: 'Доспех, зачарованный древними духами, шепчущий тайны веков.',
        type: 'armor' as const,
        rarity: 'uncommon' as const,
        value: 35,
        img: spirit_binding,
        requiredLevel: 1,
        defense: 6,
        stats: { dexterity: 2 },
        armorType: 'light',
        slot: 'chest' as const
    },

    //Перчатки
    HUNTER_GRIPS: {
        id: 'hunter_grips',
        name: 'Хваты Охотника',
        description: 'Прочные перчатки для меткой стрельбы и обращения с оружием.',
        type: 'armor' as const,
        rarity: 'common' as const,
        value: 12,
        img: hunter_grips,
        requiredLevel: 1,
        defense: 2,
        stats: { dexterity: 1 },
        armorType: 'light',
        slot: 'gloves' as const
    },
    ANCIENT_RUNE_BRACERS: {
        id: 'ancient_rune_bracers',
        name: 'Наручи Древних Рун',
        description: 'Наручи с сияющими рунами, дарящие скорость и точность движений.',
        type: 'armor' as const,
        rarity: 'common' as const,
        value: 12,
        img: ancient_rune_bracers,
        requiredLevel: 1,
        defense: 2,
        stats: { dexterity: 1 },
        armorType: 'light',
        slot: 'gloves' as const
    },
    FOREST_BRACERS: {
        id: 'forest_bracers',
        name: 'Наручи Лесника',
        description: 'Легкие наручи для защиты рук в густом подлеске.',
        type: 'armor' as const,
        rarity: 'uncommon' as const,
        value: 12,
        img: forest_bracers,
        requiredLevel: 1,
        defense: 2,
        stats: { dexterity: 1 },
        armorType: 'light',
        slot: 'gloves' as const
    },
        SOUL_WEAVE_GLOVES: {
        id: 'soul_weave_gloves',
        name: 'Перчатки из Плетения Душ',
        description: 'Перчатки, сотканные из нитей ушедших душ, чувствующие вибрации мира.',
        type: 'armor' as const,
        rarity: 'uncommon' as const,
        value: 12,
        img: soul_weave_gloves,
        requiredLevel: 1,
        defense: 2,
        stats: { dexterity: 1 },
        armorType: 'light',
        slot: 'gloves' as const
    },
    FOREST_WHISPER_GLOVES: {
        id: 'forest_whisper_gloves',
        name: 'Перчатки Шепот Леса',
        description: 'Перчатки из коры древнего дерева, позволяющие слышать голоса леса и понимать язык зверей.',
        type: 'armor' as const,
        rarity: 'rare' as const,
        value: 12,
        img: forest_whisper_gloves,
        requiredLevel: 1,
        defense: 2,
        stats: { dexterity: 1 },
        armorType: 'light',
        slot: 'gloves' as const
    },
    MOON_TOUCH_GAUNTLETS: {
        id: 'moon_touch_gauntlets',
        name: 'Рукавицы Лунного Касания',
        description: 'Сияющие перчатки, дарящие ловкость под покровом ночи.',
        type: 'armor' as const,
        rarity: 'rare' as const,
        value: 12,
        img: moon_touch_gauntlets,
        requiredLevel: 1,
        defense: 2,
        stats: { dexterity: 1 },
        armorType: 'light',
        slot: 'gloves' as const
    },
    VOID_WHISPER_GLOVES: {
        id: 'void_whisper_gloves',
        name: 'Перчатки Шепот Бездны',
        description: 'Хранящие холод космической пустоты и тишину между мирами.',
        type: 'armor' as const,
        rarity: 'epic' as const,
        value: 12,
        img: void_whisper_gloves,
        requiredLevel: 1,
        defense: 2,
        stats: { dexterity: 1 },
        armorType: 'light',
        slot: 'gloves' as const
    },
    DREAM_CATCHER_GLOVES: {
        id: 'dream_catcher_gloves',
        name: 'Перчатки Ловца Снов',
        description: 'Позволяют улавливать мысли и предчувствия из мира грез.',
        type: 'armor' as const,
        rarity: 'legendary' as const,
        value: 12,
        img: dream_catcher_gloves,
        requiredLevel: 1,
        defense: 2,
        stats: { dexterity: 1 },
        armorType: 'light',
        slot: 'gloves' as const
    },
}