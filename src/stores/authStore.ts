import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginQuery, logoutQuery, profileQuery, registerQuery } from "../services/auth-service";
import { getErrorMessage } from "../utils/errors/errorUtils";

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
    login: (email: string, password: string) => Promise<void>,
    logout: () => Promise<void>,
    registerUser: (nickName: string, email: string, password: string, confirmPassword: string) => Promise<void>,
    checkAuth: () => Promise<void>,
    clearError: () => void
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            user: null,
            error: null,

            login: async (email, password) => {
                try {

                    const data = await loginQuery(email, password);

                    set({
                        isAuthenticated: true,
                        user: data.user,
                        error: null
                    });
                } catch (error) {
                    const errorMessage = getErrorMessage(error);
                    set({
                        isAuthenticated: false,
                        user: null,
                        error: errorMessage,
                    });

                    throw error;
                }
            },

            logout: async () => {
                try {
                    await logoutQuery();
                    set({
                        isAuthenticated: false,
                        user: null,
                        error: null
                    });
                } catch (error) {
                    const errorMessage = getErrorMessage(error); 
                    set({
                        error: errorMessage, 
                        isAuthenticated: false, 
                        user: null
                    });
                    throw error;
                }
            },

            registerUser: async (nickName, email, password, confirmPassword) => {
                try {
                    const data = await registerQuery(nickName, email, password, confirmPassword);
                    set({
                        isAuthenticated: true,
                        user: data.user,
                        error: null
                    });
                } catch (error) {
                    const errorMessage = getErrorMessage(error);
                    set({
                        isAuthenticated: false,
                        user: null,
                        error: errorMessage,
                    });
                    throw error;
                }
            },

            checkAuth: async () => {
                try {
                    const data = await profileQuery();
                    set({
                        isAuthenticated: true,
                        user: data.user,
                        error: null
                    });
                } catch (error) {
                    const errorMessage = getErrorMessage(error);
                    set({
                        isAuthenticated: false,
                        user: null,
                        error: errorMessage
                    });
                }
            },

            clearError: () => set({ error: null }),
        }),
        {
            name: 'user-storage'
        }
    )
)