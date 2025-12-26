import { useEffect } from 'react'; // Убрали useCallback
import styles from './Circles.module.scss';
import { ThermalSensorSize, useApparateContext } from '../apparate';
import { useChartContext } from '../chart';
import { useTranslation } from "react-i18next";
// import formatters from "chart.js/dist/core/core.ticks";
// import values = formatters.values;

type ThermalSensorValue = {
    s: number,
    voltage: number
}

const thermalSensorValues = new Map<ThermalSensorSize, ThermalSensorValue>([
    ['LARGE', {s: 491, voltage: 57}],
    ['MEDIUM', {s: 380, voltage: 49}],
    ['SMALL', {s: 177, voltage: 32}],
])

export const Circles = () => {
    // Убрали thermalSensorSize из списка ниже
    const { setThermalSensorSize, setVoltage, currentToggle, enabled } = useApparateContext()
    const { addPoint, clear } = useChartContext('PHOTORESISTOR')
    const { t } = useTranslation()

    const handleButtonClick = (size: ThermalSensorSize) => {
        setThermalSensorSize(size)
        if(currentToggle === 3 && enabled) {
            const baseValue = thermalSensorValues.get(size)!
            const noise = (Math.random() - 0.5);
            const finalVoltage = parseFloat((baseValue.voltage + noise).toFixed(1));

            setVoltage(finalVoltage)
            addPoint(`${baseValue.s}:${finalVoltage}`, { x: baseValue.s, y: finalVoltage })
        }
    };

    useEffect(() => {
        if (!enabled) {
            clear()
        }
    }, [enabled, clear])



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
