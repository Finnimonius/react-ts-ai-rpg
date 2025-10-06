import './LocationHeader.css'

type LocationHeaderProps = {
    location: string,
}

export default function LocationHeader({ location }: LocationHeaderProps) {
    return (
        <div className="location-header-container">
            <h2 className='location-header-title'>{location}</h2>
        </div>
    )
}