import { Popover } from 'antd'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'

type Props = {
    onFlip: () => void,
    from: string,
}

type Form = {
    'nickName': string,
    'email': string,
    'password': string,
    'confirmPassword': string,
}

export default function RegisterForm({ onFlip, from }: Props) {
    const navigate = useNavigate()
    const { registerUser, error, clearError } = useAuthStore()
    const { register, handleSubmit, formState, clearErrors, watch } = useForm<Form>({
        mode: 'onChange'
    })

    const emailError = formState.errors['email']?.message;
    const passwordError = formState.errors['password']?.message;
    const confirmPasswordError = formState.errors['confirmPassword']?.message;
    const nickNameError = formState.errors['nickName']?.message;

    const handleFlip = () => {
        clearError()
        clearErrors()
        onFlip()
    }

    const handleSignup: SubmitHandler<Form> = async (data) => {
        try {
            await registerUser(data.nickName, data.email, data.password, data.confirmPassword);
            navigate(from, { replace: true });
        } catch (error) {
            console.error('Ошибка регистрации:', error);
        }
    }

    return (
        <form className="register-form" onSubmit={handleSubmit(handleSignup)}>
            <h2 className="form_details">Свиток Регистрации</h2>
            <Popover
                content={nickNameError}
                open={!!nickNameError}
                placement="left"
                color="#ff4d4f"
                classNames={{
                    root: 'login-error-popover',
                }}
            >
                <input
                    type="text"
                    className={`login-input ${nickNameError && 'shake-animation'}`}
                    placeholder="Имя героя"
                    {...register('nickName', {
                        required: 'Имя пользователя обязательно для заполнения',
                        minLength: {
                            value: 3,
                            message: 'Имя пользователя должно содержать минимум 3 символа'
                        },
                        maxLength: {
                            value: 30,
                            message: 'Имя пользователя не должно превышать 30 символов'
                        },
                        pattern: {
                            value: /^[a-zA-Z0-9]+$/,
                            message: 'Имя пользователя должно содержать только буквы и цифры'
                        }
                    })}
                />
            </Popover>
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
                    className={`login-input ${emailError && 'shake-animation'}`}
                    type="email"
                    placeholder="Камень связи (почта)"
                    {...register('email', {
                        required: 'Это поле обязательно',
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Некорректный формат email'
                        },
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
                    className={`login-input ${passwordError && 'shake-animation'}`}
                    type="password"
                    placeholder="Секретное слово"
                    {...register('password', {
                        required: 'Пароль обязателен для заполнения',
                        minLength: {
                            value: 8,
                            message: 'Пароль должен содержать минимум 8 символов'
                        },
                        maxLength: {
                            value: 128,
                            message: 'Пароль не должен превышать 128 символов'
                        },
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                            message: 'Пароль должен содержать буквы в верхнем и нижнем регистре, цифры и специальные символы'
                        }
                    })}
                />
            </Popover>
            <Popover
                content={confirmPasswordError}
                open={!!confirmPasswordError}
                placement="left"
                color="#ff4d4f"
                classNames={{
                    root: 'login-error-popover',
                }}
            >
                <input
                    type="password"
                    className={`login-input ${confirmPasswordError && 'shake-animation'}`}
                    placeholder="Повторить слово"
                    {...register('confirmPassword', {
                        required: 'Подтверждение пароля обязательно',
                        validate: (value) =>
                            value === watch('password') || 'Пароли не совпадают'
                    })}
                />
            </Popover>
            <Popover
                content={error && 'Пользователь с таким email уже существует'}
                open={!!error}
                placement="left"
                color="#ff4d4f"
            >
                <button type="submit" className="login-btn">Принять клятву</button>
            </Popover>
            <span className="login-switch">Уже путешественник?{' '}
                <label htmlFor="signup_toggle" className="signup_tog" onClick={handleFlip}>
                    Ко входу
                </label>
            </span>
        </form>
    )
}