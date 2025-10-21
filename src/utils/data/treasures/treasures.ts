export const treasures = {
  chest: {
    rewards: [
      { type: 'weapon', chance: 30 },
      { type: 'consumable', chance: 50 },
      { type: 'shopItem', category: 'any', chance: 20 },
    ],
  },
  gemstones: {
    rewards: [
      { type: 'shopItem', category: 'gemstones', weight: 100 },
    ],
  },
  bag: {
    rewards: [
      { type: 'shopItem', category: 'gold', weight: 100 },
    ],
  },
};