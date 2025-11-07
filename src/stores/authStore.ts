import { create } from "zustand";
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
    isLoading: boolean,
    login: (email: string, password: string) => Promise<void>,
    logout: () => Promise<void>,
    registerUser: (nickName: string, email: string, password: string, confirmPassword: string) => Promise<void>,
    checkAuth: () => Promise<void>,
    clearError: () => void
}

export const useAuthStore = create<AuthStore>()((set) => ({
    isAuthenticated: false,
    user: null,
    error: null,
    isLoading: true,

    login: async (email, password) => {
        try {
            set({ isLoading: true })
            const data = await loginQuery(email, password);

            set({
                isAuthenticated: true,
                user: data.user,
                error: null,
                isLoading: false
            });
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            set({
                isAuthenticated: false,
                user: null,
                error: errorMessage,
                isLoading: false
            });

            throw error;
        }
    },

    logout: async () => {
        try {
            set({ isLoading: true })
            await logoutQuery();
            set({
                isAuthenticated: false,
                user: null,
                error: null,
                isLoading: false
            });
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            set({
                error: errorMessage,
                isAuthenticated: false,
                user: null,
                isLoading: false
            });
            throw error;
        }
    },

    registerUser: async (nickName, email, password, confirmPassword) => {
        try {
            set({ isLoading: true })
            const data = await registerQuery(nickName, email, password, confirmPassword);
            set({
                isAuthenticated: true,
                user: data.user,
                error: null,
                isLoading: false
            });
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            set({
                isAuthenticated: false,
                user: null,
                error: errorMessage,
                isLoading: false
            });
            throw error;
        }
    },

    checkAuth: async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            const data = await profileQuery();
            set({
                isAuthenticated: true,
                user: data.user,
                error: null,
                isLoading: false
            });
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            set({
                isAuthenticated: false,
                user: null,
                error: errorMessage,
                isLoading: false
            });
        }
    },

    clearError: () => set({ error: null }),
}))