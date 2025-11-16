import './DirectionButton.css';

type Props = {
    descr: string,
    disabled?: boolean,
    className?: string,
    onClick: () => void;
}

export default function DirectionsButton({descr, onClick, className, disabled = false,} : Props) {
    return (
        <button onClick={onClick} className={`directions__button ${className}`} disabled={disabled}>
            {descr}
        </button>
    )
}