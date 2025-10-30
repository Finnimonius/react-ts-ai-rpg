import { useNavigate } from 'react-router-dom'

type Props = {
    onFlip: () => void
}

export default function RegisterForm({ onFlip }: Props) {
    const navigate = useNavigate()

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault()
        navigate('/play')
    }

    return (
        <form className="register-form" onSubmit={handleSignup}>
            <h2 className="form_details">Свиток Регистрации</h2>
            <input type="text" className="login-input" placeholder="Имя героя" required />
            <input type="password" className="login-input" placeholder="Секретное слово" required />
            <input type="password" className="login-input" placeholder="Повторить слово" required />
            <button type="submit" className="login-btn">Принять клятву</button>
            <span className="login-switch">Уже путешественник?
                <label htmlFor="signup_toggle" className="signup_tog" onClick={onFlip}>
                    Ко входу
                </label>
            </span>
        </form>
    )
}