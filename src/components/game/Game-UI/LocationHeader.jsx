import './LocationHeader.css'

export default function LocationHeader({ location }) {
    return (
        <div className="location-header-container">
            <h2 className='location-header-title'>{location}</h2>
        </div>
    )
}