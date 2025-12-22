import { useState } from "react"
import styles from "./RadioRtn.module.scss"
import { useApparateContext } from "../apparate"
import { useTranslation } from "react-i18next"

export const RadioBtn = () => {
    const { setCurrentToggle } = useApparateContext()
    const [rotation, setRotation] = useState(-45)
    const [activeLamp, setActiveLamp] = useState(1)
    const { t } = useTranslation()

    const rotateButton = () => {
        setRotation((r) => (r >= 45 ? -45 : r + 30))
        setActiveLamp((lamp) => (lamp % 4) + 1)

        setCurrentToggle((prev: number) => (prev >= 3 ? 0 : prev + 1))
    }

    return (
        <div>
            <div className={styles.indicators}>
                {[1, 2, 3, 4].map((index) => (
                    <div
                        key={index}
                        className={`${styles.lamp} ${activeLamp === index ? styles.active : ""}`}
                    />
                ))}
            </div>

            <div className={styles.indicatorsNumbers}>
                <div>1</div><div>2</div><div>3</div><div>4</div>
            </div>

            <div className={styles.buttonWrapper}>
                <button
                    type="button"
                    className={styles.button}
                    onClick={rotateButton}
                    style={{ transform: `rotate(${rotation}deg)` }}
                />
            </div>

            <div className={styles.text}>{t("model.sensorSelection")}</div>
        </div>
    )
}
