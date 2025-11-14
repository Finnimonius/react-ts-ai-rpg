import './DirectionButton.css';

type Props = {
    descr: string,
    onClick: () => void;
}

export default function DirectionsButton({descr, onClick} : Props) {
    return (
        <button onClick={onClick} className="directions__button">
            {descr}
        </button>
    )
}