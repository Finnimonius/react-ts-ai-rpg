import { Splitter, Menu, ConfigProvider } from 'antd';
import type { MenuProps } from 'antd';
import { useState } from "react";
import { AppstoreOutlined, ContainerOutlined, DesktopOutlined, MailOutlined, PieChartOutlined } from '@ant-design/icons';
import './Gameplay.css';
import { useCharacterStore } from "../stores/characterStore"
import CityView from "../components/game/Locations/City/CityView";
import Portal from "../components/game/Locations/City/Portal";
import Tavern from '../components/game/Locations/City/Tavern';
import Blacksmith from '../components/game/Locations/City/Blacksmith';
import DungeonView from '../components/game/Locations/Dungeon/DungeonView';
import { useNavigate, useRoutes } from 'react-router-dom';
import Market from '../components/game/Locations/City/Market';
import type { MenuInfo } from 'rc-menu/lib/interface';

const gameRoutes = [
    { path: '/', element: <CityView /> },
    { path: '/portal', element: <Portal /> },
    { path: '/tavern', element: <Tavern /> },
    { path: '/blacksmith', element: <Blacksmith /> },
    { path: '/dungeon', element: <DungeonView /> },
    { path: '/market', element: <Market /> },
]

export default function Gameplay() {
    const { reset } = useCharacterStore()
    const [collapsed, setCollapsed] = useState(true);
    const navigate = useNavigate()
    const routing = useRoutes(gameRoutes)

    const handleReset = () => {
        reset()
        navigate('/play')
    }

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const handleMenuClick: MenuProps['onClick'] = (e: MenuInfo): void => {
        e.domEvent.stopPropagation();
    };

    const items = [
        { key: '1', icon: <PieChartOutlined />, label: 'Option 1' },
        { key: '2', icon: <DesktopOutlined />, label: 'Option 2' },
        { key: '3', icon: <ContainerOutlined />, label: 'Option 3' },
        {
            key: 'sub1',
            label: 'Navigation One',
            icon: <MailOutlined />,
            children: [
                { key: '5', label: 'Option 5' },
                { key: '6', label: 'Option 6' },
                { key: '7', label: 'Option 7' },
                { key: '8', label: 'Option 8' },
            ],
        },
        {
            key: 'sub2',
            label: 'Navigation Two',
            icon: <AppstoreOutlined />,
            children: [
                { key: '9', label: 'Option 9' },
                { key: '10', label: 'Option 10' },
                {
                    key: 'sub3',
                    label: 'Submenu',
                    children: [
                        { key: '11', label: 'Option 11' },
                        { key: '12', label: 'Option 12' },
                    ],
                },
            ],
        },
    ];

    return (
        <div className="gameplay-container gameplay-layout">
            <div onClick={toggleCollapsed} className="gameplay-menu-container">
                <Menu
                    className="gameplay-menu"
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    inlineCollapsed={collapsed}
                    items={items}
                    onClick={handleMenuClick}
                />
            </div>
            <ConfigProvider theme={{ components: { Splitter: { colorPrimary: '#000103', colorFill: 'white', controlItemBgActiveHover: 'rgb(0,0,0)', controlItemBgActive: 'rgb(0,0,0)', } } }}>
                <Splitter style={{ minHeight: '90vh', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                    <Splitter.Panel resizable={true} className="gameplay-splitter">
                        <div className="splitter-content-wrapper">
                            {routing}
                        </div>
                    </Splitter.Panel>
                    <Splitter.Panel min={'32%'} defaultSize={'32%'} max={'60%'} style={{ padding: '100px 20px' }} className="gameplat-splitter-character">
                        <button onClick={handleReset}>Сбросить персонажа</button>
                    </Splitter.Panel>
                </Splitter>
            </ConfigProvider>
        </div>
    )
}