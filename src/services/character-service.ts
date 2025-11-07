import type { AddItemToInventory } from "../types/dto/character/AddItemToInventoryDto";
import type { CreateCharacterDto } from "../types/dto/character/createCharacterDto";
import type { EquipItemDto } from "../types/dto/character/equipItemDto";
import type { MoveItemDto } from "../types/dto/character/moveItemDto";
import type { SwapEquipmentDto } from "../types/dto/swapEquipmentDto";
import type { UnequipItemDto } from "../types/dto/unquipItemDto";

const SERVER_URL = 'http://localhost:3001';

export const characterApi = {
    async create(createData: CreateCharacterDto) {
        try {
            await new Promise(resolve => setTimeout(resolve, 3000));
            const response = await fetch(`${SERVER_URL}/api/character/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(createData),
                credentials: 'include'
            });

            if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`);

            const data = await response.json()

            return data
        } catch (error) {
            console.error('Ошибка запроса', error)
            throw error
        }
    },

    async get() {
        try {
            const response = await fetch(`${SERVER_URL}/api/character`, {
                credentials: 'include'
            });

            if (response.status === 404) {
                return { character: null };
            }

            if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`);

            const data = await response.json()
            return data
        } catch (error) {
            console.error('Ошибка запроса', error)
            throw error
        }
    },

    async delete() {
        try {
            const response = await fetch(`${SERVER_URL}/api/character`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`);

            const data = await response.json();
            return data
        } catch (error) {
            console.error('Ошибка запроса', error)
            throw error
        }
    },

    async equip(equipData: EquipItemDto) {
        try {
            const response = await fetch(`${SERVER_URL}/api/character/equip`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(equipData),
                credentials: 'include'
            });

            if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`);

            const data = await response.json();

            return data
        } catch (error) {
            console.error('Ошибка запроса', error)
            throw error
        }
    },

    async unequip(uneqipData: UnequipItemDto) {
        try {
            const response = await fetch(`${SERVER_URL}/api/character/unequip`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(uneqipData),
                credentials: 'include'
            });

            if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`);

            const data = await response.json();

            return data
        } catch (error) {
            console.error('Ошибка запроса', error)
            throw error
        }
    },

    async moveInventory(moveData: MoveItemDto) {
        try {
            const response = await fetch(`${SERVER_URL}/api/character/move-inventory`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(moveData),
                credentials: 'include'
            });

            if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`);

            const data = await response.json()

            return data
        } catch (error) {
            console.error('Ошибка запроса', error)
            throw error
        }
    },

    async addItemToInventory(itemData: AddItemToInventory) {
        try {
            const response = await fetch(`${SERVER_URL}/api/character/add-to-inventory`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(itemData),
                credentials: 'include'
            });

            if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`);

            const data = await response.json();

            return data
        } catch (error) {
            console.error('Ошибка запроса', error)
            throw error
        }
    },

    async swapEquipment(swapData: SwapEquipmentDto) {
        try {
            const response = await fetch(`${SERVER_URL}/api/character/swap-equipment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(swapData),
                credentials: 'include'
            });

            if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`);

            const data = await response.json()

            return data
        } catch (error) {
            console.error('Ошибка запроса', error)
            throw error
        }
    }
}