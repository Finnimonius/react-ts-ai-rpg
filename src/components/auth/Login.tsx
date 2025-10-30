import { useCallback, useState } from 'react'
import LoginForm from './LoginForm'
import './Login.css'
import RegisterForm from './RegisterForm'

export default function Login() {
    const [isFlipped, setIsFlipped] = useState(false)

    const handleFlip = useCallback(() => {
        setIsFlipped(prev => !prev)
    }, [])

    return (
        <div className="login-container">
            <div className="login-box">
                <div className={`login-form-wrapper ${isFlipped ? 'flipped' : ''}`}>
                    <LoginForm onFlip={handleFlip} />
                    <RegisterForm onFlip={handleFlip} />
                </div>
            </div>
        </div>
    )
}