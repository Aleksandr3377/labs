import { useApparateContext } from '../apparate'
import styles from './PhotoresistorPin.module.css'

export const PhotoresistorPin = () => {
    const { photoresistorAperture } = useApparateContext()

    if (photoresistorAperture == null) return null

    return (
        <div className={`${styles.pin} ${styles[`pin--${photoresistorAperture.toLowerCase()}`]}`} />
    )
}
