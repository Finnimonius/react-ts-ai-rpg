import { useNavigate } from 'react-router-dom'

type Props = {
    onFlip: () => void,
}

export default function LoginForm({ onFlip }: Props) {
    const navigate = useNavigate()

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        navigate('/play')
    }

    return (
        <form className="login-form" onSubmit={handleLogin}>
            <h2 className="form_details">Портал Приключений</h2>
            <input type="email" className="login-input" placeholder="Камень связи (почта)" required />
            <input type="password" className="login-input" placeholder="Ключ доступа" required />
            <button type="submit" className="login-btn">Войти в мир</button>
            <span className="login-switch">Новый искатель приключений?
                <label htmlFor="signup_toggle" className="signup_tog" onClick={onFlip}>
                    Зарегистрироваться
                </label>
            </span>
        </form>
    )
}