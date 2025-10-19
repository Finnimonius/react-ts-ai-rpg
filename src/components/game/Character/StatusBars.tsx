import { ConfigProvider, Progress } from "antd";
import './StatusBars.css'

export default function StatusBars() {
    return (
        <div className="character-sheet-status-wrapper">
            <ConfigProvider
                theme={{
                    components: {
                        Progress: {
                            colorText: 'white',
                        },
                    },
                }}
            >
                <Progress className="character-sheet-hp" size={{ height: 5 }} percent={90} strokeColor={'red'} style={{ width: '35vh', color: 'white' }} />
            </ConfigProvider>
            <ConfigProvider
                theme={{
                    components: {
                        Progress: {
                            colorText: 'white',
                            colorSuccess: '#1677ff'
                        },
                    },
                }}
            >
                <Progress className="character-sheet-hp" size={{ height: 5 }} percent={100} style={{ width: '35vh', color: 'white' }} />
            </ConfigProvider>
        </div>
    )
}