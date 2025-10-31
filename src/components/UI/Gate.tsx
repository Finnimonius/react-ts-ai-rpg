import './Gate.css';
import gate from '../../assets/images/backgrounds/gate.png';
import rock3 from '../../assets/images/ui-elements/rock-3.png';
import rock2 from '../../assets/images/ui-elements/rock-2-small-med.png';
import rock3Med from '../../assets/images/ui-elements/rock-3-med.png';
import rock4 from '../../assets/images/ui-elements/rock-4.png';
import rock5Large from '../../assets/images/ui-elements/rock-5-large.png';
import rock5 from '../../assets/images/ui-elements/rock-5.png';
import rock6SmallMed from '../../assets/images/ui-elements/rock-6-small-med.png';
import rock7 from '../../assets/images/ui-elements/rock-7.png';
import rock8 from '../../assets/images/ui-elements/rock-8.png';
import rock9 from '../../assets/images/ui-elements/rock-9.png';
import rock10 from '../../assets/images/ui-elements/rock-10.png';
import rock11 from '../../assets/images/ui-elements/rock-11.png';
import rock13 from '../../assets/images/ui-elements/rock-13.png';
import rock14 from '../../assets/images/ui-elements/rock-14.png';
import rock15 from '../../assets/images/ui-elements/rock-15.png';
import rock16 from '../../assets/images/ui-elements//rock-16.png';
import rock17 from '../../assets/images/ui-elements/rock-17.png';
import rock18 from '../../assets/images/ui-elements/rock-18.png';

import { motion, type Transition } from 'framer-motion';

export default function Gate() {
    const movementAnimation = {
        y: [-3, 3, -3] as [number, number, number],
    };

    const movementTransition: Transition = {
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut"
    };

    const glowAnimation = {
        opacity: [0, 1, 0] as [number, number, number],
        boxShadow: [
            "inset 0 0 10px 1px rgba(255, 0, 0, 0.8), 0 0 10px 1px rgba(255, 0, 0, 0.8)",
            "inset 0 0 25px 5px rgba(255, 0, 0, 1), 0 0 25px 5px rgba(255, 0, 0, 1)",
            "inset 0 0 10px 1px rgba(255, 0, 0, 0.8), 0 0 10px 1px rgba(255, 0, 0, 0.8)"
        ] as [string, string, string],
    };

    const glowTransition: Transition = {
        duration: 4,
        times: [0, 0.1, 1],
        repeat: Infinity,
        ease: ["easeOut", "easeOut"]
    };

    return (
        <div className='gate__container'>
            <motion.div
                className="gate-img-back"
                animate={{
                    ...movementAnimation,
                }}
                transition={{
                    y: movementTransition,
                }}
            />
            <motion.div
                className="gate__img-under"
                animate={{
                    ...movementAnimation,
                    ...glowAnimation,
                }}
                transition={{
                    y: movementTransition,
                    opacity: glowTransition,
                    boxShadow: glowTransition,
                }}
            />
            <motion.img
                className="gate__img"
                src={gate}
                alt="Портал"
                animate={movementAnimation}
                transition={movementTransition}
            />
            <motion.img
                className="gate-rock3"
                src={rock3}
                alt="Камень"
                animate={{
                    x: [0, 3, 0, -3, 0],
                    y: [0, -5, 2, -5, 0],
                    rotate: [0, 2, -1, 2, 0]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.img
                className="gate-rock2"
                src={rock2}
                alt="Камень"
                animate={{
                    x: [0, 3, 0, -3, 0],
                    y: [0, -6, 2, -6, 0],
                    rotate: [0, 2, -1, 2, 0]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.img
                className="gate-rock3-med"
                src={rock3Med}
                alt="Камень"
                animate={{
                    x: [0, 2, 0, -2, 0, -5, -15, -25, -35, -25, -15, -5, 0],
                    y: [0, -3, 1, -3, 0, 5, 15, 20, 25, 20, 15, 5, 0],
                    rotate: 0
                }}
                transition={{
                    duration: 12,
                    times: [0, 0.15, 0.3, 0.45, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1],
                    ease: "linear",
                    repeat: Infinity
                }}
            />
            <motion.img
                className="gate-rock12"
                src={rock10}
                alt="Камень"
                animate={{
                    x: [0, 4, 0, -4, 0],
                    y: [0, -5, 2, -5, 0],
                    rotate: [0, 3, -2, 3, 0]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.img
                className="gate-rock4"
                src={rock4}
                alt="Камень"
                animate={{
                    x: [0, 7, 0, -7, 0],
                    y: [0, -9, 2, -9, 0],
                    rotate: [0, 2, -1, 2, 0]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.img
                className="gate-rock5-large"
                src={rock5Large}
                alt="Камень"
                animate={{
                    x: [0, 4, 0, -4, 0],
                    y: [0, -5, 2, -5, 0],
                    rotate: [0, 3, -2, 3, 0]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.img
                className="gate-rock5"
                src={rock5}
                alt="Камень"
                animate={{
                    y: [0, 4, 0, -4, 0],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.img
                className="gate-rock6-small-med"
                src={rock6SmallMed}
                alt="Камень"
                animate={{
                    y: [-4, 4, -4]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.img
                className="gate-rock7"
                src={rock7}
                alt="Камень"
                animate={{
                    x: [0, 3, 0, -3, 0],
                    y: [0, -5, 2, -5, 0],
                    rotate: [0, 2, -1, 2, 0]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.img
                className="gate-rock8"
                src={rock8}
                alt="Камень"
                animate={{
                    y: [-3, 3, -3],
                    x: [0, 3, 0, -3, 0],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.img
                className="gate-rock9"
                src={rock9}
                alt="Камень"
                animate={{
                    y: [-3, 3, -3],
                    x: [0, 3, 0, -3, 0],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.img
                className="gate-rock10"
                src={rock10}
                alt="Камень"
                animate={{
                    y: [-5, 3, -5],
                    x: [0, 3, 0, -3, 0],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.img
                className="gate-rock11"
                src={rock11}
                alt="Камень"
                animate={{
                    x: [0, 2, 0, -2, 0, 5, 15, 25, 35, 25, 15, 5, 0],
                    y: [0, -3, 1, -3, 0, 5, 15, 20, 25, 20, 15, 5, 0],
                    rotate: 0
                }}
                transition={{
                    duration: 12,
                    times: [0, 0.15, 0.3, 0.45, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1],
                    ease: "linear",
                    repeat: Infinity
                }}
            />
            <motion.img
                className="gate-rock13"
                src={rock13}
                alt="Камень"
                animate={{
                    x: [0, 3, 0, -3, 0],
                    y: [0, -6, 2, -6, 0],
                    rotate: [0, 2, -1, 2, 0]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.img
                className="gate-rock14"
                src={rock14}
                alt="Камень"
                animate={{
                    x: [0, 3, 0, -3, 0],
                    y: [0, -6, 2, -6, 0],
                    rotate: [0, 2, -1, 2, 0]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.img
                className="gate-rock15"
                src={rock15}
                alt="Камень"
                animate={{
                    x: [0, 4, 0, -4, 0],
                    y: [0, -5, 2, -5, 0],
                    rotate: [0, 3, -2, 3, 0]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.img
                className="gate-rock16"
                src={rock16}
                alt="Камень"
                animate={{
                    x: [0, 3, 0, -3, 0],
                    y: [0, -5, 2, -5, 0],
                    rotate: [0, 2, -1, 2, 0]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.img
                className="gate-rock17"
                src={rock17}
                alt="Камень"
                animate={{
                    y: [-5, 3, -5],
                    x: [0, 3, 0, -3, 0],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.img
                className="gate-rock18"
                src={rock18}
                alt="Камень"
                animate={{
                    x: [0, 3, 0, -3, 0],
                    y: [0, -6, 2, -6, 0],
                    rotate: [0, 2, -1, 2, 0]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </div>
    );
}