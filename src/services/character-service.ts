import { config } from "../config/env";
import type { AddItemToInventory } from "../types/dto/character/AddItemToInventoryDto";
import type { CreateCharacterDto } from "../types/dto/character/createCharacterDto";
import type { EquipItemDto } from "../types/dto/character/equipItemDto";
import type { MoveItemDto } from "../types/dto/character/moveItemDto";
import type { SwapEquipmentDto } from "../types/dto/character/swapEquipmentDto";
import type { UnequipItemDto } from "../types/dto/character/unquipItemDto";

export const characterApi = {
    async create(createData: CreateCharacterDto) {
        try {
            await new Promise(resolve => setTimeout(resolve, 3000));
            const response = await fetch(`${config.apiUrl}/character/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(createData),
                credentials: 'include'
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error || `Ошибка сервера: ${response.status}`);

            return data
        } catch (error) {
            console.error('Ошибка запроса', error)
            throw error
        }
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
        try {
            const response = await fetch(`${config.apiUrl}/character`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            const data = await response.json();

            if (!response.ok) throw new Error(data.error || `Ошибка сервера: ${response.status}`);

            return data
        } catch (error) {
            console.error('Ошибка запроса', error)
            throw error
        }
    },

    async equip(equipData: EquipItemDto) {
        try {
            const response = await fetch(`${config.apiUrl}/character/equip`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(equipData),
                credentials: 'include'
            });
            const data = await response.json();

            if (!response.ok) throw new Error(data.error || `Ошибка сервера: ${response.status}`);

            return data
        } catch (error) {
            console.error('Ошибка запроса', error)
            throw error
        }
    },

    async unequip(uneqipData: UnequipItemDto) {
        try {
            const response = await fetch(`${config.apiUrl}/character/unequip`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(uneqipData),
                credentials: 'include'
            });
            const data = await response.json();

            if (!response.ok) throw new Error(data.error || `Ошибка сервера: ${response.status}`);

            return data
        } catch (error) {
            console.error('Ошибка запроса', error)
            throw error
        }
    },

    async moveInventory(moveData: MoveItemDto) {
        try {
            const response = await fetch(`${config.apiUrl}/character/move-inventory`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(moveData),
                credentials: 'include'
            });
            const data = await response.json();

            if (!response.ok) throw new Error(data.error || `Ошибка сервера: ${response.status}`);

            return data
        } catch (error) {
            console.error('Ошибка запроса', error)
            throw error
        }
    },

    async addItemToInventory(itemData: AddItemToInventory) {
        try {
            const response = await fetch(`${config.apiUrl}/character/add-to-inventory`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(itemData),
                credentials: 'include'
            });
            const data = await response.json();

            if (!response.ok) throw new Error(data.error || `Ошибка сервера: ${response.status}`);

            return data
        } catch (error) {
            console.error('Ошибка запроса', error)
            throw error
        }
    },

    async swapEquipment(swapData: SwapEquipmentDto) {
        try {
            const response = await fetch(`${config.apiUrl}/character/swap-equipment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(swapData),
                credentials: 'include'
            });
            const data = await response.json();

            if (!response.ok) throw new Error(data.error || `Ошибка сервера: ${response.status}`);

            return data
        } catch (error) {
            console.error('Ошибка запроса', error)
            throw error
        }
    }
}