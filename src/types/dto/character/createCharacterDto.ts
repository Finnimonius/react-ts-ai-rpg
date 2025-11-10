import type { ClassId } from "../../character.types";


export interface CreateCharacterDto {
    classId: ClassId,
    backgroundId: string,
}