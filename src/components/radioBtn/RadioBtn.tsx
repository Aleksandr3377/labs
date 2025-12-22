import { useState } from 'react';
// @ts-ignore
import styles from './RadioRtn.module.scss';
import { useApparateContext } from '../apparate';
import {useTranslation} from "react-i18next";

export const RadioBtn = () => {
    const {currentToggle, setCurrentToggle} = useApparateContext()
    const [rotation, setRotation] = useState(-45);
    const [activeLamp, setActiveLamp] = useState(1);
    const { t } = useTranslation()

    const rotateButton = () => {
        setRotation(rotation + 30);
        setActiveLamp((activeLamp % 4) + 1);
        setCurrentToggle(currentToggle + 1)

        if (currentToggle === 3) {
            setRotation(-45)
            setCurrentToggle(0)
        }
    };

    return (
        <div>
            <div className={styles.indicators}>
                {[1, 2, 3, 4].map((index) => (
                    <div
                        key={index}
                        className={`${styles.lamp} ${activeLamp === index ? styles.active : ''}`}
                    ></div>
                ))}
            </div>

            <div className={styles.indicatorsNumbers}>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
            </div>

            <div className={styles.buttonWrapper}>
                <button
                    className={styles.button}
                    onClick={rotateButton}
                    style={{ transform: `rotate(${rotation}deg)` }}
                ></button>
            </div>

            <div className={styles.text}>
                {t("model.sensorSelection")}
            </div>
        </div>
    );
};
