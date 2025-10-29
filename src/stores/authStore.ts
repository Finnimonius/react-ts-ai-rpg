import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginQuery, logoutQuery, profileQuery, registerQuery } from "../services/auth-service";

type User = {
    _id: string,
    nickName: string,
    email: string,
    createdAt: Date,
    updatedAt: Date,
}

interface AuthStore {
    isAuthenticated: boolean,
    user: User | null,
    error: string | null,
    login: (email: string, password: string) => void,
    logout: () => void,
    register: (nickName: string, email: string, password: string, confirmPassword: string) => void,
    checkAuth: () => void,
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            user: null,
            error: null,

            login: async (email, password) => {
                const data = await loginQuery(email, password);

                set({
                    isAuthenticated: true,
                    user: data.user
                })
            },

            logout: async () => {
                await logoutQuery()

                set({
                    isAuthenticated: false,
                    user: null
                })
            },

            register: async (nickName, email, password, confirmPassword) => {
                const data = await registerQuery(nickName, email, password, confirmPassword);

                set({
                    isAuthenticated: true,
                    user: data.user
                })
            },

            checkAuth: async () => {
                const data = await profileQuery()

                if (!data) {
                    set({
                        isAuthenticated: false,
                        user: null
                    })
                } else {
                    set({
                        isAuthenticated: true,
                        user: data.user
                    })
                }
            }
        }),
        {
            name: 'user-storage'
        }
    )
)