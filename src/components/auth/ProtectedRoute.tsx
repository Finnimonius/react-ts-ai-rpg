import { Navigate } from "react-router-dom"
import { useAuthStore } from "../../stores/authStore"

type Props = {
    children: React.ReactNode
}

export default function ProtectedRoute({children}: Props) {
    const { isAuthenticated } = useAuthStore()

    if(!isAuthenticated) {
        return <Navigate to='/login' replace />
    }


    return children
    
}