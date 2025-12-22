// @ts-ignore
import styles from './Sensor.module.scss'

interface Props {
    text: string;
}

export const Sensor = ({text}: Props) => {
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.innerBox}></div>
                </div>
            </div>

            <div className={styles.btnContainer}>
                <div className={styles.innerBtn}></div>
            </div>

            <div className={styles.text}>
                {text}
            </div>
        </div>
    )
}