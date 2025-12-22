import styles from './SensorPin.module.css'
import {useApparateContext} from "../apparate";

export const SensorPin = () => {
    const {circleWeights} = useApparateContext()

    const weights = {
        SMALL: 96.5,
        MEDIUM: 98.2,
        BIG: 99.2,
        BIGGEST: 101.5
    };

    if(circleWeights == null) {
        return (<></>)
    }

    return (
        <div className={`${styles.pin} ${styles[`pin--${circleWeights.toLowerCase()}`]}`}>{weights[circleWeights]}</div>
    )
}