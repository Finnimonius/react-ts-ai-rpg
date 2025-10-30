import ParticlesBackground from '../components/UI/ParticleBackground'
// import { useAuthStore } from '../stores/authStore'
import './Home.css'

export default function Home() {

    // const {logout} = useAuthStore()
    return (
        <div className='home-contaner'>
            {/* <button onClick={logout}>Сбросить</button> */}
            <ParticlesBackground />
        </div>
    )
}