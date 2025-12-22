import { Photoresistor } from '../photoresistor'
import { RadioBtn } from '../radioBtn'
import { Sensor } from '../sensor'
import { Sensor1 } from '../sensor1/Sensor1.tsx'
import { Voltmeter } from '../voltmeter'
import styles from './Apparate.module.css'
import {useTranslation} from "react-i18next";

export const Apparate = () => {
    const { t } = useTranslation()

    return (
        <div className={styles.main}>
            <div className={styles.sensor}>
                <Sensor1 text={t("model.strainGauge")} />
            </div>
            <div className={styles.sensor}>
                <Sensor text={t("model.thermoSensor")} />
            </div>
            <div className={styles.sensor}>
                <Voltmeter />
            </div>
            <div className={styles.sensor}>
                <Sensor text={t("model.capacitiveSensor")} />
            </div>
            <div className={styles.sensor}>
                <Photoresistor />
            </div>
            <div className={styles.sensor}>
                <RadioBtn />
            </div>
        </div>
    )
}