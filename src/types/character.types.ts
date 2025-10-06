import type { CLASSES } from "../utils/characterData/classes";
import type { RACES } from "../utils/characterData/races";

export type Class = typeof CLASSES[number]
export type Race = typeof RACES[number]