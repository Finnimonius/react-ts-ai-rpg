import { apiClient } from "../utils/api/apiClient";

export async function loginQuery(email: string, password: string) {
    return apiClient<{ email: string, password: string }>('/auth/login', {
        method: 'POST',
        body: { email, password }
    })
}

export async function logoutQuery() {
    return apiClient('/auth/logout', {
        method: 'POST'
    })
}

export async function registerQuery(nickName: string, email: string, password: string, confirmPassword: string) {
    return apiClient<{nickName: string, email: string, password: string, confirmPassword: string}>('/auth/register', {
        method: 'POST',
        body: {nickName, email, password, confirmPassword}
    })
}

export async function profileQuery() {
    return apiClient('/auth/profile')
}