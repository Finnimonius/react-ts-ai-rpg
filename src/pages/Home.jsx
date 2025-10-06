import ParticlesBackground from '../components/UI/ParticleBackground'
import './Home.css'
// import paladinImage from '../assets/images/234.png';

export default function Home() {
    return (
        <div className='home-contaner'>
            {/* <img src={paladinImage} alt="" className='home-img'/> */}
            <ParticlesBackground />
        </div>
    )
}