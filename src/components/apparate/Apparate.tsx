import { Photoresistor } from '../photoresistor'
import { RadioBtn } from '../radioBtn'
import { Sensor } from '../sensor'
import { Sensor1 } from '../sensor1/Sensor1'
import { Voltmeter } from '../voltmeter'
import styles from './Apparate.module.css'
import switchStyles from '../switch/Switch.module.scss'
import { useApparateContext } from '../apparate'
import { useTranslation } from "react-i18next"

export const Apparate = () => {
    const { t } = useTranslation()
    const { enabled, setEnabled, setVoltage } = useApparateContext()

    const onToggle = (checked: boolean) => {
        setEnabled(checked)
        if (!checked) setVoltage(0)
    }

    return (
        <div className={styles.main}>

            {/* SWITCH BOTTOM-RIGHT */}
            <div className={styles.switchBox}>
                <input
                    type="checkbox"
                    id="connect-model"
                    checked={enabled}
                    onChange={(e) => onToggle(e.target.checked)}
                    className={switchStyles.highload1}
                />
                <label
                    htmlFor="connect-model"
                    data-onlabel={t("connectModel.on")}
                    data-offlabel={t("connectModel.off")}
                    className={switchStyles.lb1}
                />
                <span className={styles.switchText}>
          {t("connectModel.title")}
        </span>
            </div>

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
