import { useEffect, useState, useMemo } from 'react';
import styles from './ThermoSensor.module.scss'
import { useApparateContext } from '../apparate';
import { useTranslation } from "react-i18next";

export const ThermoSensor = () => {
    const { enabled, currentToggle, setVoltage } = useApparateContext()
    const { t } = useTranslation()

    const [buttonState, setButtonState] = useState(false);
    const [temperature, setTemperature] = useState(30);
    const [isWaterAdded, setIsWaterAdded] = useState(false);
    const [flaskWaterLevel, setFlaskWaterLevel] = useState(80);

    const currentVoltage = useMemo(() => {
        if (isWaterAdded) return 17;
        return temperature - 30;
    }, [temperature, isWaterAdded]);

    const isDisplayActive = enabled && currentToggle === 1;
    const displayVoltage = isDisplayActive ? currentVoltage : 0;

    useEffect(() => {
        if (!enabled || currentToggle !== 1) {
            setButtonState(false);
            setTemperature(30);
            setIsWaterAdded(false);
            setFlaskWaterLevel(80);
        }
    }, [enabled, currentToggle]);

    useEffect(() => {
        let intervalId: ReturnType<typeof setInterval> | undefined
        if (buttonState && enabled && !isWaterAdded) {
            intervalId = setInterval(() => {
                setTemperature(prev => {
                    if (prev >= 55) {
                        setButtonState(false);
                        return prev;
                    }
                    return prev + 1;
                });
            }, 3000);
        }
        return () => { if (intervalId) clearInterval(intervalId) }
    }, [buttonState, enabled, isWaterAdded]);

    useEffect(() => {
        setVoltage(displayVoltage);
    }, [displayVoltage, setVoltage]);

    const handleAddWater = () => {
        setFlaskWaterLevel(0);
        setTimeout(() => {
            setIsWaterAdded(true);
        }, 500);
    };

    const scaleMarks = Array.from({ length: 15 }, (_, i) => i * 5);

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>{t("thermosensorTitle.title")}</h1>

            <div className={styles.container}>
                <div className={styles.potWrapper}>
                    <div className={styles.pot}>
                        <div
                            className={styles.water}
                            style={{ height: isWaterAdded ? '90%' : '60%' }}
                        />
                    </div>
                    <div className={styles.stove}>
                        <button
                            className={styles.button}
                            disabled={isWaterAdded}
                            onClick={() => {
                                if (temperature >= 55) setTemperature(30);
                                setButtonState(!buttonState);
                            }}>
                            {buttonState ? t("waterHeating.stop") : t("waterHeating.start")}
                        </button>
                    </div>
                </div>

                {!isWaterAdded && (
                    <div className={styles.thermometer}>
                        <div className={styles.degrees}>
                            {scaleMarks.map(mark => <div key={mark}>{mark}</div>)}
                        </div>
                        <div className={styles.scaleWrapper}>
                            <div
                                className={styles.scale}
                                style={{ height: `${(temperature / 70) * 100}%` }}
                            />
                        </div>
                    </div>
                )}

                {temperature >= 55 && !isWaterAdded && (
                    <div className={styles.coldWaterFlask}>
                        <div className={styles.flask}>
                            <div
                                className={styles.flaskWater}
                                style={{ height: `${flaskWaterLevel}%` }}
                            />
                        </div>
                        <button className={styles.addWaterBtn} onClick={handleAddWater}>
                            {t("waterHeating.addColdWater")}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}