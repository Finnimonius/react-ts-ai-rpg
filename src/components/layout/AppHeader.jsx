import { NavLink } from "react-router-dom";
import { Layout, Button, Drawer } from 'antd'
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import logo from '../../assets/images/logos/main-logo.png'
import './AppHeader.css'
import { useCharacterStore } from "../../stores/characterStore";
import { useState } from "react";

const setActive = ({ isActive }) => isActive ? 'active-link' : 'nav-link';
const setActivePlay = ({ isActive }) => isActive ? 'active-link' : 'nav-link-play';


export default function AppHeader() {
    const { hasCharacter } = useCharacterStore()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

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
                    <NavLink to='/' className={setActive}>Главная</NavLink>
                    <NavLink to='/rules' className={setActive}>Правила</NavLink>
                    <NavLink to='/charactercreato' className={setActive}>Создание персонажа</NavLink>

                    {hasCharacter() ? (
                        <NavLink to='/play/game' className={setActivePlay}>Играть</NavLink>
                    ) : (
                        <NavLink to='/play' className={setActivePlay}>Играть</NavLink>
                    )}

                </nav>
                <Drawer
                    title="Basic Drawer"
                    closable={{ 'aria-label': 'Close Button' }}
                    closeIcon={<CloseOutlined style={{ color: 'white', fontSize: '18px' }} />}
                    onClose={toggleMobileMenu}
                    open={isMobileMenuOpen}
                    style={{backgroundColor: 'var(--primary-black)'}}
                >
                    <nav className='header-nav-drawer'>
                        {hasCharacter() ? (
                            <NavLink to='/play/game' className={setActivePlay}>Играть</NavLink>
                        ) : (
                            <NavLink to='/play' className={setActivePlay}>Играть</NavLink>
                        )}
                        <NavLink to='/' className={setActive}>Главная</NavLink>
                        <NavLink to='/rules' className={setActive}>Правила</NavLink>
                        <NavLink to='/charactercreato' className={setActive}>Создание персонажа</NavLink>
                    </nav>
                </Drawer>
            </div>
        </Layout.Header>
    )
}