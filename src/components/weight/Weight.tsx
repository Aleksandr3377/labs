import { useEffect } from 'react';
import styles from './Weight.module.scss';
import {CircleSize, useApparateContext} from '../apparate';
import { useChartContext } from '../chart';
import {useTranslation} from "react-i18next";

export interface CircleWeight {
    weight: number
    voltage: number
}

const weights = new Map<CircleSize, CircleWeight>([
    ['SMALL', { weight: 96.5, voltage: Math.floor(Math.random() * 3) + 22 }],
    ['MEDIUM', { weight: 98.2, voltage: Math.floor(Math.random() * 14) + 20 }],
    ['BIG', { weight: 99.2, voltage: Math.floor(Math.random() * 14) + 20 }],
    ['BIGGEST', { weight: 101.5, voltage: Math.floor(Math.random() * 9) + 27 }]
])

export const Weight = () => {
    const { circleWeights, setCircleWeights, enabled, currentToggle, setVoltage } = useApparateContext()
    const { addPoint, clear } = useChartContext('WEIGHT')
    const { t } = useTranslation()

    const handleButtonClick = (size: CircleSize) => {
        setCircleWeights(size)
        if(currentToggle == 0 && enabled) {
            const value = weights.get(size)!
            setVoltage(value.voltage)
            addPoint(value.weight.toString(), { x: value.weight, y: value.voltage })
        }
    };

    useEffect(() => {
        if (!enabled) {
            clear()
        }

        if(circleWeights){
            handleButtonClick(circleWeights)
        } else if(currentToggle == 0) {
            setVoltage(0)
        }
    }, [currentToggle, enabled, circleWeights])

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>{t("weightTitle.title")}</h1>

            <div className={styles.container}>
                <button
                    className={`${styles.circle} ${styles.circleSmall}`}
                    onClick={() => handleButtonClick('SMALL')}>
                    96,5
                </button>
                <button
                    className={`${styles.circle} ${styles.circleMedium}`}
                    onClick={() => handleButtonClick('MEDIUM')}>
                    98,2
                </button>
                <button
                    className={`${styles.circle} ${styles.circleBig}`}
                    onClick={() => handleButtonClick('BIG')}>
                    99,2
                </button>
                <button
                    className={`${styles.circle} ${styles.circleBiggest}`}
                    onClick={() => handleButtonClick('BIGGEST')}>
                    101,5
                </button>
            </div>
        </div>
    );
};
