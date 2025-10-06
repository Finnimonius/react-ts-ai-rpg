import { Link } from 'react-router-dom'
import './NotFoundPage.css'

export default function NotFoundPage () {
    return (
        <div className="not-found-container">
            <div className="parchment">
                <div className="ink-stain"></div>
                <h1 className="error-title">404</h1>
                <p className="error-subtitle">Страница потеряна в подземелье</p>
                <p className="error-description">
                    Даже самый опытный искатель приключений иногда теряет путь. 
                    Эта страница оказалась запертой в забытом склепе.
                </p>
                <div className="error-stats">
                    <div className="stat">
                        <span className="stat-label">Уровень опасности:</span>
                        <span className="stat-value">Красный</span>
                    </div>
                    <div className="stat">
                        <span className="stat-label">Рекомендация:</span>
                        <span className="stat-value">Возврат в таверну</span>
                    </div>
                </div>
                <Link to="/" className="return-button">
                    ⚔️ Вернуться к приключениям
                </Link>
            </div>
        </div>
    )
}