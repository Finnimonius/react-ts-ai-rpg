import type { ALL_LOCATIONS } from "../../../utils/data/locations/all-locations";


export interface CreateGameDto {
    currentDungeon: keyof typeof ALL_LOCATIONS;
}