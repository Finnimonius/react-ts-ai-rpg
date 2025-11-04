import { useForm, type SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore';
import { Popover } from 'antd';

type Props = {
    onFlip: () => void,
    from: string,
}

type Form = {
    'email': string,
    'password': string,
}

export default function LoginForm({ onFlip, from }: Props) {
    const navigate = useNavigate();
    const { register, handleSubmit, formState, clearErrors } = useForm<Form>({
        mode: 'onChange'
    });
    const { login } = useAuthStore()

    const handleFlip = () => {
        clearErrors()
        onFlip()
    }

    const emailError = formState.errors['email']?.message;
    const passwordError = formState.errors['password']?.message;

    const handleLogin: SubmitHandler<Form> = async (data) => {
        try {
            await login(data.email, data.password)
            navigate(from, { replace: true })
        } catch (error) {
            console.error('Ошибка регистрации', error)
        }
    }

    return (
        <form className="login-form" onSubmit={handleSubmit(handleLogin)}>
            <h2 className="form_details">Портал Приключений</h2>
            <Popover
                content={emailError}
                open={!!emailError}
                placement="left"
                color="#ff4d4f"
                classNames={{
                    root: 'login-error-popover',
                }}
            >
                <input
                    type="email"
                    className="login-input"
                    placeholder="Камень связи (почта)"
                    {...register('email', {
                        required: 'Это поле обязательно',
                    })}
                />
            </Popover>
            <Popover
                content={passwordError}
                open={!!passwordError}
                placement="left"
                color="#ff4d4f"
                classNames={{
                    root: 'login-error-popover',
                }}
            >
                <input
                    type="password"
                    className="login-input"
                    placeholder="Секретное слово"
                    {...register('password', {
                        required: 'Это поле обязательно',
                    })}
                />
            </Popover>
            <button type="submit" className="login-btn">Войти в мир</button>
            <span className="login-switch">Новый искатель приключений?
                <label htmlFor="signup_toggle" className="signup_tog" onClick={handleFlip}>
                    Зарегистрироваться
                </label>
            </span>
        </form>
    )
}