import styles from "./RadioRtn.module.scss";
import { useApparateContext } from "../apparate";
import { useTranslation } from "react-i18next";

export const RadioBtn = () => {
    const { enabled, currentToggle, setCurrentToggle } = useApparateContext();
    const { t } = useTranslation();

    // 0..3 -> -45, -15, 15, 45
    const rotation = -45 + currentToggle * 30;
    const activeLamp = currentToggle + 1; // 1..4

    const rotateButton = () => {
        setCurrentToggle((prev: number) => (prev >= 3 ? 0 : prev + 1));
    };

    return (
        <div>
            <div className={styles.indicators}>
                {[1, 2, 3, 4].map((index) => (
                    <div
                        key={index}
                        className={`${styles.lamp} ${enabled && activeLamp === index ? styles.active : ""}`}
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
                    onClick={rotateButton}              // ✅ работает и при OFF
                    style={{ transform: `rotate(${rotation}deg)` }}
                />
            </div>

            <div className={styles.text}>{t("model.sensorSelection")}</div>
        </div>
    );
};
