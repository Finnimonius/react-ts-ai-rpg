import { Button } from 'antd'

type NavigationButtonProps = {
    descr: string,
    onClick: () => void,
    disabled?: boolean
}

export function NavigationButton({ descr, onClick, disabled = false }: NavigationButtonProps) {

    return (
        <Button type="primary" loading={false} onClick={onClick} disabled={disabled}>
            {descr}
        </Button>
    )
}   