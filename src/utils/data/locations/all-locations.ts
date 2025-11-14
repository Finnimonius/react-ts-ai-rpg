import type { DirectionName, Directions } from "../../../types/game.types";
import { FOREST_LOCATION } from "./forest-locations";

export const ALL_LOCATIONS = {
    forest: FOREST_LOCATION,
    desert: null,
}

export const DIRECTION_NAMES: Record<Directions, DirectionName> = {
  south: 'Юг',
  southeast: 'Юго-восток',
  southwest: 'Юго-запад',
  west: 'Запад',
  north: 'Север',
  northwest: 'Северо-запад',
  northeast: 'Северо-восток'
};