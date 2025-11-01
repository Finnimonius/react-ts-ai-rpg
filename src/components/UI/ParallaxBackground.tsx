import { useParallax } from '../../hooks/useParallax';

export const ParallaxBackgroundHero = () => {
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

export const ParallaxBackgroundAbout = () => {
    const parallaxItem = useParallax(-0.1);
    const parallaxItem2 = useParallax(-0.2);

    return (
        <>
            <div className='home-about__back' style={{
                transform: `translateY(${parallaxItem}px)`
            }}></div>
            <div className='home-about__back2' style={{
                transform: `translateY(${parallaxItem2}px)`
            }}></div>
        </>
    );
};