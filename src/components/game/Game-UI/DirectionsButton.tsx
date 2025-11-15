import './DirectionButton.css';

type Props = {
    descr: string,
    disabled?: boolean,
    onClick: () => void;
}

export default function DirectionsButton({descr, onClick, disabled = false} : Props) {
    return (
        <button onClick={onClick} className="directions__button" disabled={disabled}>
            {descr}
        </button>
    )
}