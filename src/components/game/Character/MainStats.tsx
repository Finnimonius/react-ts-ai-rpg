import { useState, useRef } from "react";
import './MainStats.css'
import { useCharacterStore } from "../../../stores/characterStore";
import { calculateEuqipmentStats } from "../../../utils/generators/items-builder";

export default function MainStats() {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const { avaliableStatsPoints, currentStats, equipment } = useCharacterStore();
    const popoverRef = useRef<HTMLDivElement>(null);

    const handleButtonClick = () => {
        if (!isOpen) {
            setIsOpen(true);
            setTimeout(() => setIsVisible(true), 10);
        } else {
            setIsVisible(false);
            setTimeout(() => setIsOpen(false), 300);
        }
    };

    const getStatName = (stat: string): string => {
        const statNames: Record<string, string> = {
            strength: 'Сила',
            dexterity: 'Ловкость',
            intelligence: 'Интеллект',
            wisdom: 'Мудрость',
            constitution: 'Телосложение',
            luck: 'Удача'
        };
        return statNames[stat] || stat;
    };

    const equipmentStats = calculateEuqipmentStats(equipment);
    const currentStatsWithEquipment = {
        strength: currentStats.strength + (equipmentStats.stats.strength || 0),
        dexterity: currentStats.dexterity + (equipmentStats.stats.dexterity || 0),
        intelligence: currentStats.intelligence + (equipmentStats.stats.intelligence || 0),
        wisdom: currentStats.wisdom + (equipmentStats.stats.wisdom || 0),
        constitution: currentStats.constitution + (equipmentStats.stats.constitution || 0),
        luck: currentStats.luck + (equipmentStats.stats.luck || 0),
    };

    return (
        <div className="main-stats-container">
            <button
                onClick={handleButtonClick}
                className={`main-stats-btn ${avaliableStatsPoints > 0 ? 'blinking-simple' : ''}`}
            >
                <svg width="1.5vh" height="1.5vh" viewBox="0 0 20 20">
                    <path
                        d="M10 3V17M3 10H17"
                        stroke="#e6d6b2"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            </button>

            {isOpen && (
                <div
                    ref={popoverRef}
                    className={`main-stats-custom-popover ${isVisible ? 'show' : 'hide'}`}
                >
                    <div className="main-stats-header">
                        <svg
                            width='2.3vh'
                            height='2.3vh'
                            viewBox="0 0 512 512"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#000000"
                        >
                            <path d="M162.027,360.441v73.413c0,4.554,5.805,6.479,8.525,2.825l12.645-16.98c0.451-0.605,1.359-0.599,1.801,0.013 l11.992,16.577c2.689,3.718,8.564,1.815,8.564-2.772v-73.075H162.027z" fill="#7A2B5A"></path>
                            <path d="M309.645,360.441v113.088c0,3.281,4.313,4.476,5.987,1.653c6.298-10.608,16.825-26.333,27.974-34.318 c0.852-0.609,1.365-1.56,1.365-2.607v-77.815H309.645z" fill="#5B153E"></path>
                            <path d="M340.555,35.233h46.059c7.661,0,13.872,6.211,13.872,13.872v305.021c0,7.661-6.211,13.872-13.872,13.872 h-46.059V35.233z" fill="#5B153E"></path>
                            <path d="M268.258,43.615h99.326c8.564,0,15.506,6.943,15.506,15.507v293.369c0,8.564-6.941,15.507-15.506,15.507 h-99.326V43.615z" fill="#B57B76"></path>
                            <linearGradient gradientUnits="userSpaceOnUse" id="SVGID_1_" x1="371.3076" x2="-26.5867" y1="97.2808" y2="404.9693">
                                <stop offset="0.0103" stopColor="#78264D"></stop>
                                <stop offset="1" stopColor="#93486F"></stop>
                            </linearGradient>
                            <path d="M129.536,35.233h147.942l24.04,35.087c2.444,3.568,8.002,2.232,8.558-2.057l4.282-33.03h30.595 c7.175,0,12.992,5.817,12.992,12.992v306.78c0,7.175-5.817,12.992-12.992,12.992H128.698c-9.49,0-17.183-7.693-17.183-17.184V53.255 C111.515,43.302,119.583,35.233,129.536,35.233z" fill="url(#SVGID_1_)"></path>
                            <path d="M367.051,79.716v107.243l24.069-99.8c0.915-3.793-1.96-7.443-5.86-7.443H367.051z" fill="#DDAEA9"></path>
                            <path d="M275.082,201.306l17.881-33.115c1.902-3.522-0.648-7.8-4.652-7.8h-35.32l-13.609-25.202 c-1.998-3.7-7.306-3.7-9.304,0l-13.608,25.202h-35.32c-4.003,0-6.554,4.277-4.652,7.8l17.881,33.115l-17.881,33.115 c-1.902,3.522,0.649,7.799,4.652,7.799h35.32l13.608,25.203c1.998,3.7,7.307,3.7,9.304,0l13.609-25.203h35.32 c4.004,0,6.555-4.276,4.652-7.799L275.082,201.306z M278.787,171.359l-9.938,18.403l-9.938-18.403H278.787z M262.617,201.306 l-16.171,29.946h-23.435l-16.17-29.946l16.17-29.946h23.435L262.617,201.306z M234.729,149.658l5.795,10.732h-11.59L234.729,149.658 z M190.672,171.359h19.874l-9.937,18.403L190.672,171.359z M190.672,231.252l9.937-18.403l9.937,18.403H190.672z M234.729,252.952 l-5.795-10.732h11.59L234.729,252.952z M268.85,212.848l9.938,18.404h-19.875L268.85,212.848z" fill="#FFFFFF"></path>
                            <path d="M139.146,323.046l1.483-20.025c0.409-5.521,7.904-6.863,10.204-1.829l7.456,16.317 c1.259,2.756-0.018,6.006-2.816,7.167l-8.939,3.709C142.852,329.912,138.852,327.021,139.146,323.046z" fill="#5B153E"></path>
                            <path d="M339.178,88.399c-2.006-1.276-4.69-0.465-5.613,1.727c-1.633,3.878-3.373,9.453-1.102,11.725 c0.824,0.825,1.774,1.992,2.75,3.305c2.224,2.993,6.968,1.459,6.968-2.271V92.427c0-1.318-0.673-2.545-1.785-3.253L339.178,88.399z" fill="#5B153E"></path>
                            <path d="M159.483,191.128c3.947-29.271,25.252-53.812,53.556-62.25c15.352-4.577,30.036-3.984,43.285-0.009 c1.861,0.559,3.824-0.438,4.377-2.301l2.209-7.428c0.538-1.811-0.461-3.758-2.27-4.3c-8.214-2.463-16.907-3.803-25.912-3.803 c-22.875,0-43.782,8.536-59.74,22.574c-1.236,1.088-1.549,2.902-0.801,4.369l3.387,6.646l-5.525-3.885 c-1.486-1.046-3.546-0.853-4.759,0.501c-14.373,16.035-23.141,37.191-23.141,60.37c0,35,19.964,65.407,49.094,80.482 c1.972,1.02,4.397,0.019,5.177-2.061l2.541-6.775c0.671-1.79-0.131-3.756-1.817-4.654 C172.321,254.307,154.987,224.47,159.483,191.128z" fill="#FFFFFF"></path>
                            <path d="M282.068,127.492l-5.615,7.279c-0.977,1.266-0.646,3.063,0.678,3.957 c20.631,13.947,34.114,37.692,33.535,64.548c-0.773,35.922-32.204,70.089-67.935,73.87c-11.665,1.234-22.825-0.279-33.021-3.864 c-1.682-0.592-3.485,0.444-3.74,2.21l-1.316,9.114c-0.194,1.343,0.592,2.657,1.881,3.081c12.25,4.025,25.635,5.523,39.553,3.805 c42.821-5.285,76.411-41.149,79.047-84.214c2.04-33.317-14.061-63.08-39.33-80.401C284.605,126.056,282.955,126.342,282.068,127.492 z" fill="#FFFFFF"></path>
                        </svg>
                        <h3 className="main-stats-title">Характеристики</h3>
                    </div>
                    <div className="main-stats-box">
                        {Object.entries(currentStatsWithEquipment).map(([stat, value]) => (
                            <div key={stat} className="main-stats-wrapper">
                                <p>{getStatName(stat)}: <span className="main-stats-value">{value}</span></p>
                                {avaliableStatsPoints > 0
                                    &&
                                    <button className={`main-stats-btn1 blinking-simple`}>
                                        <svg width="1.5vh" height="1.5vh" viewBox="0 0 20 20">
                                            <path
                                                d="M10 3V17M3 10H17"
                                                stroke="#e6d6b2"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </button>}

                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}