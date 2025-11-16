import { AppstoreOutlined, AreaChartOutlined, DesktopOutlined, MailOutlined, ShopOutlined } from '@ant-design/icons';
import { ConfigProvider, Menu } from 'antd';
import { memo } from 'react';

const items = [
    { key: '1', icon: <DesktopOutlined style={{ color: 'white' }} />, label: 'Option 1' },
    { key: '2', icon: <ShopOutlined style={{ color: 'white' }} />, label: 'Option 2' },
    { key: '3', icon: <AreaChartOutlined style={{ color: 'white' }} />, label: 'Option 3' },
    {
        key: 'sub1',
        label: 'Navigation One',
        icon: <MailOutlined style={{ color: 'white' }} />,
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
        icon: <AppstoreOutlined style={{ color: 'white' }} />,
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


function GameplayMenu() {

    return (
        <ConfigProvider
            theme={{
                components: {
                    Menu: {
                        itemSelectedBg: '#5d4037',
                        // itemSelectedColor: '#your-selected-text-color',
                        // itemHoverBg: '#your-hover-bg-color',
                        // itemHoverColor: '#your-hover-text-color',
                    },
                },
            }}
        >
            <Menu
                className="gameplay-menu"
                mode="inline"
                inlineCollapsed={true}
                items={items}
                theme="light"
            />
        </ConfigProvider>
    )
}

export default memo(GameplayMenu)