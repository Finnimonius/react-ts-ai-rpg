import { useCallback, useState } from 'react'
import LoginForm from './LoginForm'
import './Login.css'
import RegisterForm from './RegisterForm'
import { useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import PageLoader from '../UI/PageLoader';

export default function Login() {
    const [isFlipped, setIsFlipped] = useState(false);
    const location = useLocation();
    const { isLoading } = useAuthStore()
    const from = location.state?.from?.pathname || '/play';

    const handleFlip = useCallback(() => {
        setIsFlipped(prev => !prev)
    }, [])

    if (isLoading) {
        return <PageLoader />
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <div className={`login-form-wrapper ${isFlipped ? 'flipped' : ''}`}>
                    <LoginForm onFlip={handleFlip} from={from} />
                    <RegisterForm onFlip={handleFlip} from={from} />
                </div>
            </div>
        </div>
    )
}