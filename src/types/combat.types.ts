export type CombatRewardType = 'chest'

export interface CombatState {
    state: 'active' | 'victory' | 'defeat' | 'fled';
    turn: 'player' | 'enemy';
    turnNumber: number;
    enemyHealth: number;
}