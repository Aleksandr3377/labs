import { useEffect, useCallback } from 'react'; // Додав useCallback
import styles from './Weight.module.scss';
import { CircleSize, useApparateContext } from '../apparate';
import { useChartContext } from '../chart';
import { useTranslation } from "react-i18next";

// Прибрав unused interface CircleWeight

const weightData = new Map<CircleSize, number>([
    ['SMALL', 96.5],
    ['MEDIUM', 98.2],
    ['BIG', 99.2],
    ['BIGGEST', 101.5]
]);

const calculateVoltage = (weight: number) => {
    const baseVoltage = 1.5 * weight - 120.5;
    const noise = (Math.random() - 0.5) * 1.5;
    return Math.round((baseVoltage + noise) * 10) / 10;
};

export const Weight = () => {
    const { circleWeights, setCircleWeights, enabled, currentToggle, setVoltage } = useApparateContext()
    const { addPoint, clear } = useChartContext('WEIGHT')
    const { t } = useTranslation()

    const handleButtonClick = useCallback((size: CircleSize) => {
        setCircleWeights(size)
        if (currentToggle === 0 && enabled) {
            const weight = weightData.get(size)!;
            const voltage = calculateVoltage(weight);

            setVoltage(voltage);
            // Точка додається ТІЛЬКИ ТУТ - при кліку
            addPoint(`${weight}-${Date.now()}`, { x: weight, y: voltage });
        }
    }, [currentToggle, enabled, setCircleWeights, setVoltage, addPoint]);

    useEffect(() => {
        // Очищаємо графік, якщо макет вимкнено
        if (!enabled) {
            clear();
            setVoltage(0);
            return;
        }

        // Якщо макет увімкнено, але жодна гиря не обрана
        if (!circleWeights && currentToggle === 0) {
            setVoltage(0);
        }

        // ВАЖЛИВО: Ми прибрали звідси автоматичне додавання точок!
    }, [currentToggle, enabled, circleWeights, clear, setVoltage]);

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