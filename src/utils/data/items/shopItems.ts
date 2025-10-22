import ruby from '../../../assets/images/items/shop-items/ruby.png';
import sapphire from '../../../assets/images/items/shop-items/sapphire.png';
import emerald from '../../../assets/images/items/shop-items/emerald.png';
import gold_ore from '../../../assets/images/items/shop-items/gold_ore.png';
import gold_coins from '../../../assets/images/items/shop-items/gold_coins.png';
import gold_bars from '../../../assets/images/items/shop-items/gold_bars.png';
import rare_coin from '../../../assets/images/items/shop-items/rare_coin.png';

export const SHOP_ITEM_IMAGES = {
  ruby: ruby,
  sapphire: sapphire,
  emerald: emerald,
  gold_ore: gold_ore,
  gold_coins: gold_coins,
  gold_bars: gold_bars,
  rare_coin: rare_coin
};

export const SHOP_ITEMS = {
  RUBY: {
    id: 'ruby',
    name: 'Рубин',
    description: 'Красная разновидность минерала корунда',
    type: 'shopItem' as const,
    rarity: 'rare' as const,
    value: 30,
    img: 'ruby',
    category: 'gemstones'
  },
  SAPPHIRE: {
    id: 'sapphire',
    name: 'Сапфир',
    description: 'Драгоценный камень, который высоко ценится в ювелирном деле',
    type: 'shopItem' as const,
    rarity: 'rare' as const,
    value: 30,
    img: 'sapphire',
    category: 'gemstones'
  },
  EMERALD: {
    id: 'emerald',
    name: 'Изумруд',
    description: 'Драгоценный камень, который является разновидностью минерала берилла с глубоким зеленым цветом',
    type: 'shopItem' as const,
    rarity: 'rare' as const,
    value: 30,
    img: 'emerald',
    category: 'gemstones'
  },
  GOLD_ORE: {
    id: 'gold_ore',
    name: 'Золотая руда',
    description: 'Природное минеральное образование, содержащее золото',
    type: 'shopItem' as const,
    rarity: 'rare' as const,
    value: 30,
    img: 'gold_ore',
    category: 'gold'
  },
  GOLD_COINS: {
    id: 'gold_coins',
    name: 'Золотые монеты',
    description: 'Горсть золотых монет',
    type: 'shopItem' as const,
    rarity: 'rare' as const,
    value: 30,
    img: 'gold_coins',
    category: 'gold'
  },
  GOLD_BARS: {
    id: 'gold_bars',
    name: 'Золотые слитки',
    description: 'Бруски золота высокой пробы',
    type: 'shopItem' as const,
    rarity: 'rare' as const,
    value: 30,
    img: 'gold_bars',
    category: 'gold'
  },
  RARE_COIN: {
    id: 'rare_coin',
    name: 'Редкая монета',
    description: 'Монета с гравировкой дракона. Может представлять ценность у коллекционеров.',
    type: 'shopItem' as const,
    rarity: 'rare' as const,
    value: 30,
    img: 'rare_coin',
    category: 'gold'
  }
};