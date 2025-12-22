import { useEffect } from 'react';
// @ts-ignore
import styles from './Switch.module.scss';
import { useApparateContext } from '../apparate';
import {useTranslation} from "react-i18next";

export const Switch = () => {
    const {enabled, setEnabled, setVoltage} = useApparateContext()
    const { t } = useTranslation()

    useEffect(() => {
        if(!enabled) {
            setVoltage(0)
        }
    }, [enabled])

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>{t("connectModel.title")}</h1>
            <input 
                type="checkbox" 
                id={styles.highload1} 
                name="highload1" 
                className={styles.highload1}
                onChange={(e) => {
                    if(e.target.checked) {
                        setEnabled(true)
                    } else {
                        setEnabled(false)
                    }
                }} />
            <label htmlFor={styles.highload1} data-onlabel={t("connectModel.on")} data-offlabel={t("connectModel.off")} className={styles.lb1}></label>
        </div>
    );
}
