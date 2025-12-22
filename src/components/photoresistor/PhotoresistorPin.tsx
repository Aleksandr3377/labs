import { useApparateContext } from '../apparate'
import styles from './PhotoresistorPin.module.css'

export const PhotoresistorPin = () => {
    const {thermalSensorSize} = useApparateContext()

    if(thermalSensorSize == null) {
        return (<></>)
    }

    return (
        <div className={`${styles.pin} ${styles[`pin--${thermalSensorSize.toLowerCase()}`]}`} />
    )
}