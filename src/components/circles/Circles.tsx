import { useEffect } from 'react';
import styles from './Circles.module.scss';
import { ThermalSensorSize, useApparateContext } from '../apparate';
import { useChartContext } from '../chart';
import {useTranslation} from "react-i18next";
// import formatters from "chart.js/dist/core/core.ticks";
// import values = formatters.values;

type ThermalSensorValue = {
    s: number,
    voltage: number
}

const thermalSensorValues = new Map<ThermalSensorSize, ThermalSensorValue>([
    ['LARGE', {s: 491, voltage: Math.floor(Math.random() * 5) + 53 }],
    ['MEDIUM', {s: 380, voltage: Math.floor(Math.random() * 10) + 41 }],
    ['SMALL', {s: 177, voltage: Math.floor(Math.random() * 9) + 32 }],
])

export const Circles = () => {
    const { setThermalSensorSize, setVoltage, thermalSensorSize, currentToggle, enabled } = useApparateContext()
    const { addPoint } = useChartContext('PHOTORESISTOR')
    const { t } = useTranslation()

    const handleButtonClick = (size: ThermalSensorSize) => {
        setThermalSensorSize(size)
        if(currentToggle == 3 && enabled) {
            const value = thermalSensorValues.get(size)!
            setVoltage(value.voltage)
            addPoint(value.s.toString(), { x: value.s, y: value.voltage })
        }
    };

    useEffect(() => {
        if(thermalSensorSize){
            handleButtonClick(thermalSensorSize)
        } else if(currentToggle == 3) {
            setVoltage(0)
        }
    }, [currentToggle, enabled])

    return (
        <div>
            <h1 className={styles.title}>{t("photoresistorTitle.title")}</h1>

            <div className={styles.wrapper}>
                <button
                    className={styles.circleSmall}
                    onClick={() => handleButtonClick('SMALL')}
                >
                    177мм<sup>2</sup>
                </button>
                <button
                    className={styles.circleMedium}
                    onClick={() => handleButtonClick('MEDIUM')}
                >
                    380мм<sup>2</sup>
                </button>
                <button
                    className={styles.circleBig}
                    onClick={() => handleButtonClick('LARGE')}
                >
                    491мм<sup>2</sup>
                </button>
            </div>
        </div>
    );
};
