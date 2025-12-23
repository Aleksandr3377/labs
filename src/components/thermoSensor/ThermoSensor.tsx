import {useEffect, useRef, useState} from 'react';
import styles from './ThermoSensor.module.scss'
import {useApparateContext} from '../apparate';
import {useChartContext} from '../chart';
import {useTranslation} from "react-i18next";

export const ThermoSensor = () => {
    const {enabled, currentToggle, setVoltage} = useApparateContext()
    const {addPoint, clear} = useChartContext('THERMOSENSOR')
    const [buttonState, setButtonState] = useState(false)
    const [temperature, setTemperature] = useState(18)
    const indicator = useRef<HTMLDivElement>(null)
    const { t } = useTranslation()

    useEffect(() => {
        if (!enabled) {
            clear()
            setTemperature(18)
        }

        if (!enabled || currentToggle != 1) {
            setButtonState(false)
        }
    }, [enabled, currentToggle, buttonState])

    useEffect(() => {
        let intervalId: ReturnType<typeof setInterval> | undefined

        if (buttonState) {
            intervalId = setInterval(() => {
                setTemperature(temperature => temperature + Math.floor(Math.random() * 2) + 1);
            }, 1000)
        }

        return () => {
            if (intervalId) clearInterval(intervalId)
        }
    }, [buttonState])

    useEffect(() => {
        if (temperature >= 55) {
            setButtonState(false)
        } else if (temperature >= 30) {
            const currentVoltage = temperature * 1.25
            setVoltage(currentVoltage)
            addPoint(`${temperature}:${currentVoltage}`, {
                x: parseFloat(temperature.toFixed(1)), y: currentVoltage
            })
        }
    }, [temperature])

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>{t("thermosensorTitle.title")}</h1>

            <div className={styles.container}>
                <div className={styles.pot}></div>
                <div className={styles.water}></div>

                <div className={styles.thermometer}>
                    <div className={styles.degrees}>
                        <div>0</div>
                        <div>10</div>
                        <div>20</div>
                        <div>30</div>
                        <div>40</div>
                        <div>50</div>
                        <div>60</div>
                        <div>70</div>
                    </div>
                    <div className={styles.scaleWrapper}>
                        <div
                            className={styles.scale}
                            ref={indicator}
                            style={{height: `${temperature * 2.22}px`}}/>
                    </div>
                </div>

                <div className={styles.stove}>
                    <button
                        className={styles.button}
                        onClick={() => {
                            if (temperature == 18) {
                                setButtonState((value) => !value)
                            }
                        }}>
                        {buttonState ? t("waterHeating.stop") : t("waterHeating.start")}
                    </button>
                </div>
            </div>
        </div>
    );
}