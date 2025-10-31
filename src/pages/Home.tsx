// import ParticlesBackground from '../components/UI/ParticleBackground'
import Gate from '../components/UI/Gate'
import './Home.css'

export default function Home() {

    return (
        <>
            <section className='home-hero'>
                {/* <ParticlesBackground /> */}
                <div className='home-hero__container'>
                    <div className='home-hero__content'>
                        <div className='home-hero__left'>

                        </div>
                        <div className='home-hero__right'>
                            <Gate />
                        </div>
                    </div>
                </div>
            </section>
            <section className='home-about'>

            </section>
        </>
    )
}