import { useParallax } from '../../hooks/useParallax';

export const ParallaxBackground = () => {
    const parallaxRockLeft = useParallax(0.2);
    const parallaxRockRight = useParallax(0.5);
    
    return (
        <>
            <div className='home-hero__back' style={{
                transform: `translateY(${parallaxRockLeft}px)`
            }}></div>
            <div className='home-hero__back2' style={{
                transform: `translateY(${parallaxRockRight}px)`
            }}></div>
        </>
    );
};