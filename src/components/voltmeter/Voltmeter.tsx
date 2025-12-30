import { useEffect, useRef, useState } from 'react'
import { useApparateContext } from '../apparate'
import styles from './Voltmeter.module.scss'

export const Voltmeter = () => {
    const {voltage} = useApparateContext()
    const [previousVoltage, setPreviousVoltage] = useState(0)
    const indicator = useRef<HTMLDivElement>(null)

    useEffect(() => {
        indicator.current?.animate([
            { transform: `translateX(${previousVoltage}px)` },
            { transform: `translateX(${voltage}px)` }
        ], { duration: 1000 })
        setTimeout(() => setPreviousVoltage(voltage), 1000)
    }, [voltage])

    return (
        <div>
            <div className={styles.numbers}>
                <div>100</div>
                <div>50</div>
                <div>0</div>
                <div>50</div>
                <div>100</div>
            </div>

            <div className={styles.scale}/>
            <div className={styles.vIndicator} style={{transform: `translateX(${voltage}px)`}} ref={indicator}/>
            <div className={styles.vLabel}>V</div>
        </div>
    )
}