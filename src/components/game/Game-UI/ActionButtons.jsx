import { Button } from 'antd'
import { useGameStore } from '../../../stores/gameStore'

export function NavigationButton({ descr, onClick, disabled = false }) {
    const { isLoading } = useGameStore()

    return (
        <Button type="primary" loading={isLoading} onClick={onClick} disabled={disabled}>
            {descr}
        </Button>
    )
}   