import type { DirectionName, Directions } from "../../game.types";

export interface MoveToLocationDto {
    directionId: Directions,
    directionName: DirectionName
}