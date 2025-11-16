import { Navigate, useLocation } from "react-router-dom"
import { useAuthStore } from "../../stores/authStore"
import PageLoader from "../UI/PageLoader";

type Props = {
    children: React.ReactNode
}

export default function ProtectedRoute({ children }: Props) {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
    const isLoading = useAuthStore(state => state.isLoading);
    const location = useLocation()

    if (isLoading) {
        return <PageLoader />
    }

    if (!isAuthenticated) {
        return <Navigate to='/login' replace state={{ from: location }} />
    }

    return children
}