import { Button } from 'antd'
import { useGameStore } from '../../../stores/gameStore'

type NavigationButtonProps = {
    descr: string,
    onClick: () => void,
    disabled?: boolean
}

export function NavigationButton({ descr, onClick, disabled = false }: NavigationButtonProps) {
    const { isLoading } = useGameStore()

    return (
        <Button type="primary" loading={false} onClick={onClick} disabled={disabled}>
            {descr}
        </Button>
    )
}   