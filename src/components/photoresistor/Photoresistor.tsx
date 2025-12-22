import styles from './Photoresistor.module.css'
import { PhotoresistorPin } from './PhotoresistorPin'
import {useTranslation} from "react-i18next";

export const Photoresistor = () => {
    const { t } = useTranslation()

    return (
        <div>
            <div className={styles.photoresistor}>
                <div className={styles.lens}>
                    <PhotoresistorPin/>
                </div>
            </div>

            <div className={styles.text}>
                {t("model.photoresistor")}
            </div>
        </div>
    )
}