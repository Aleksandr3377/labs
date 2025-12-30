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
    const { enabled, setEnabled, setVoltage } = useApparateContext()

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

            <div className={styles.sensor}><Sensor1 text={t("model.strainGauge")} /></div>
            <div className={styles.sensor}><Sensor text={t("model.thermoSensor")} /></div>
            <div className={styles.sensor}><Voltmeter /></div>
            <div className={styles.sensor}><Sensor text={t("model.capacitiveSensor")} /></div>
            <div className={styles.sensor}><Photoresistor /></div>
            <div className={styles.sensor}><RadioBtn /></div>
        </div>
    )
}