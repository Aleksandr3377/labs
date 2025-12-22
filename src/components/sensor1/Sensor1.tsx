// @ts-ignore
import styles from './Sensor1.module.scss'
import {SensorPin} from "./SensorPin.tsx";

interface Props {
    text: string;
}

export const Sensor1 = ({text}: Props) => {
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.innerBox}></div>
                </div>
            </div>

            <div className={styles.btnContainer}>
                <SensorPin />
            </div>

            <div className={styles.text}>
                {text}
            </div>
        </div>
    )
}