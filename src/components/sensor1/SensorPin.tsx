import styles from './SensorPin.module.css'
import {useApparateContext} from "../apparate";

export const SensorPin = () => {
    const {circleWeights} = useApparateContext()

    const weights = {
        SMALL: "37.5",
        MEDIUM: "42",
        BIG: "45.9",
        BIGGEST: "Mx"
    };

    if(circleWeights == null) {
        return (<></>)
    }

    return (
        <div className={`${styles.pin} ${styles[`pin--${circleWeights.toLowerCase()}`]}`}>
            {weights[circleWeights]}
        </div>
    )
}