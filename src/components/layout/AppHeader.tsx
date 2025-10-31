import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Layout, Button, Drawer, Dropdown, type MenuProps } from 'antd'
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import logo from '../../assets/images/logos/main-logo.png'
import './AppHeader.css'
import { useCharacterStore } from "../../stores/characterStore";
import { useAuthStore } from "../../stores/authStore";
import { useState } from "react";

type IsActive = {
    isActive: boolean
}

const setActive = ({ isActive }: IsActive) => isActive ? 'active-link' : 'nav-link';

export default function AppHeader() {
    const { hasCharacter } = useCharacterStore()
    const { isAuthenticated, logout, user } = useAuthStore()
    const navigate = useNavigate()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const location = useLocation()

    const isGameSection = location.pathname.includes('/play') || location.pathname === '/login';
    const setActivePlay = ({ isActive }: IsActive) => isActive || isGameSection ? 'active-link' : 'nav-link-play';

    const handlePlayClick = (targetPath: string) => {
        if (!isAuthenticated) {
            navigate('/login')
        } else {
            navigate(targetPath)
        }
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const items: MenuProps['items'] = [
        {
            key: 'content',
            type: 'group',
            label: <div className="header-profile-content">
                <h2>Профиль</h2>
                <h3>{user?.nickName}</h3>
            </div>,
        },
        {
            key: 'logout',
            label: 'Выйти из аккаунта',
            className: "custom-logout-item",
            onClick: () => {
                logout()
            }
        },

    ];

    return (
        <Layout.Header className='header-layout'>
            <div className="header-container">
                <NavLink to='/'>
                    <img className="header-logo" src={logo} alt="Логотип dungeons and dragons" />
                </NavLink>
                <Button
                    className="mobile-menu-button"
                    type="text"
                    icon={isMobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
                    onClick={toggleMobileMenu}
                    style={{ color: 'red', fontSize: '24px' }}
                />
                <nav className='header-nav'>
                    {isAuthenticated &&
                        <Dropdown
                            menu={{
                                items,
                                style: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'right',
                                    justifyContent: 'space-between',
                                    width: 300,
                                    height: 150,
                                    borderRadius: 10,
                                    border: '2px solid #5d4037',
                                    backgroundColor: '#1a1a1a'
                                },
                            }}
                        >
                            <button className="header-profile-btn"></button>
                        </Dropdown>
                    }
                    <NavLink to='/' className={setActive}>Главная</NavLink>
                    <NavLink to='/rules' className={setActive}>Правила</NavLink>
                    <NavLink to='/charactercreato' className={setActive}>Создание персонажа</NavLink>

                    {hasCharacter() ? (
                        <NavLink to="/play/game" className={setActivePlay}
                            onClick={(e) => {
                                if (!isAuthenticated) {
                                    e.preventDefault()
                                    handlePlayClick('/play/game')
                                }
                            }}
                        >
                            Играть
                        </NavLink>
                    ) : (
                        <NavLink to="/play" className={setActivePlay}
                            onClick={(e) => {
                                if (!isAuthenticated) {
                                    e.preventDefault()
                                    handlePlayClick('/play')
                                }
                            }}
                        >
                            Играть
                        </NavLink>
                    )}
                </nav>

                <Drawer
                    title="Basic Drawer"
                    closable={{ 'aria-label': 'Close Button' }}
                    closeIcon={<CloseOutlined style={{ color: 'white', fontSize: '18px' }} />}
                    onClose={toggleMobileMenu}
                    open={isMobileMenuOpen}
                    style={{ backgroundColor: 'var(--primary-black)' }}
                >
                    <nav className='header-nav-drawer'>
                        {hasCharacter() ? (
                            <NavLink to="/play/game" className={setActivePlay}
                                onClick={(e) => {
                                    if (!isAuthenticated) {
                                        e.preventDefault()
                                        handlePlayClick('/play/game')
                                    }
                                    toggleMobileMenu()
                                }}
                            >
                                Играть
                            </NavLink>
                        ) : (
                            <NavLink to="/play" className={setActivePlay}
                                onClick={(e) => {
                                    if (!isAuthenticated) {
                                        e.preventDefault()
                                        handlePlayClick('/play')
                                    }
                                    toggleMobileMenu()
                                }}
                            >
                                Играть
                            </NavLink>
                        )}
                        <NavLink to='/' className={setActive}>Главная</NavLink>
                        <NavLink to='/rules' className={setActive}>Правила</NavLink>
                        <NavLink to='/charactercreato' className={setActive}>Создание персонажа</NavLink>
                    </nav>
                </Drawer>
            </div>
        </Layout.Header >
    )
}