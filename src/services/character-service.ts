import { config } from "../config/env";
import type { AddItemToInventory } from "../types/dto/character/AddItemToInventoryDto";
import type { CreateCharacterDto } from "../types/dto/character/createCharacterDto";
import type { EquipItemDto } from "../types/dto/character/equipItemDto";
import type { MoveItemDto } from "../types/dto/character/moveItemDto";
import type { SwapEquipmentDto } from "../types/dto/character/swapEquipmentDto";
import type { UnequipItemDto } from "../types/dto/character/unquipItemDto";
import { apiClient } from "../utils/api/apiClient";

export const characterApi = {
    async create(createData: CreateCharacterDto) {
        await new Promise(resolve => setTimeout(resolve, 3000));
        return apiClient<CreateCharacterDto>('/character', {
            method: 'POST',
            body: createData
        })
    },

    async get() {
        try {
            const response = await fetch(`${config.apiUrl}/character`, {
                credentials: 'include'
            });

            if (response.status === 404) {
                return { character: null };
            }
            const data = await response.json();

            if (!response.ok) throw new Error(data.error || `Ошибка сервера: ${response.status}`);

            return data
        } catch (error) {
            console.error('Ошибка запроса', error)
            throw error
        }
    },

    async delete() {
        return apiClient('/character', {
            method: 'DELETE'
        })
    },

    async equip(equipData: EquipItemDto) {
        return apiClient<EquipItemDto>('/character/equip', {
            method: 'POST',
            body: equipData
        })
    },

    async unequip(uneqipData: UnequipItemDto) {
        return apiClient<UnequipItemDto>('/character/unequip', {
            method: 'POST',
            body: uneqipData
        })
    },

    async moveInventory(moveData: MoveItemDto) {
        return apiClient<MoveItemDto>('/character/move-inventory', {
            method: 'POST',
            body: moveData
        })
    },

    async addItemToInventory(itemData: AddItemToInventory) {
        return apiClient<AddItemToInventory>('/character/add-to-inventory', {
            method: 'POST',
            body: itemData
        })
    },

    async swapEquipment(swapData: SwapEquipmentDto) {
        return apiClient<SwapEquipmentDto>('/character/swap-equipment', {
            method: 'POST',
            body: swapData
        })
    }
}