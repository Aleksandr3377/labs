import { Photoresistor } from '../photoresistor'
import { RadioBtn } from '../radioBtn'
import { Sensor } from '../sensor'
import { Sensor1 } from '../sensor1/Sensor1'
import { Voltmeter } from '../voltmeter'
import styles from './Apparate.module.css'
import { useApparateContext } from '../apparate'
import { useTranslation } from "react-i18next"

export const Apparate = () => {
    const { t } = useTranslation()
    const { enabled, setEnabled, setVoltage, currentToggle } = useApparateContext()


    const toggle = () => {
        setEnabled(prev => {
            const next = !prev
            if (!next) setVoltage(0)
            return next
        })
    }

    return (
        <div className={styles.main}>
            {/* 🔘 ON / OFF BUTTON */}
            <div className={styles.switchBox}>
                <button
                    className={`${styles.powerBtn} ${enabled ? styles.on : styles.off}`}
                    onClick={toggle}
                >
                    {enabled ? 'ON' : 'OFF'}
                </button>
                {/* Зайвий напис {t("connectModel.title")} видалено */}
            </div>

            <div className={styles.sensor}>
                <div className={`${styles.cornerLamp} ${enabled && currentToggle === 0 ? styles.cornerLampActive : ""}`} />
                <Sensor1 text={t("model.strainGauge")} />
            </div>
            <div className={styles.sensor}>
                <div className={`${styles.cornerLamp} ${enabled && currentToggle === 1 ? styles.cornerLampActive : ""}`} />
                <Sensor text={t("model.thermoSensor")} />
            </div>
            <div className={styles.sensor}>
                <Voltmeter />
            </div>
            <div className={styles.sensor}>
                <div className={`${styles.cornerLamp} ${enabled && currentToggle === 2 ? styles.cornerLampActive : ""}`} />
                <Sensor text={t("model.capacitiveSensor")} />
            </div>
            <div className={styles.sensor}>
                <div className={`${styles.cornerLamp} ${enabled && currentToggle === 3 ? styles.cornerLampActive : ""}`} />
                <Photoresistor />
            </div>
            <div className={styles.sensor}><RadioBtn /></div>
        </div>
    )
}