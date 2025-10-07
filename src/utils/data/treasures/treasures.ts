export const treasures = {
  chest: {
    items: ['gold_coins', 'silver_ring', 'health_potion'],
    gold: 150
  },
  bag: {
    items: ['smuggled_goods', 'map_fragment'],
    gold:  80
  },
  gemstones: {
    items: ['diamond', 'emerald', 'sapphire', 'ruby'],
    gold: 600
  },
  gold_coins: {
    items: ['rare_coin', 'gold_bar'],
    gold:  200
  },
} as const;