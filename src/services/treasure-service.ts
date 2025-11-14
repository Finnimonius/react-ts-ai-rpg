import { apiClient } from "../utils/api/apiClient"

export const treasureApi = {
    async updateEventOpenedStatus() {
        return apiClient('/event/treasure/open', {
            method: 'POST'
        })
    },

    async updateEventTakenStatus() {
        return apiClient('/event/treasure/take', {
            method: 'POST'
        })
    }
}