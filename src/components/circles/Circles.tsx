import React, { useEffect, useMemo, useState } from 'react'
import styles from './Circles.module.scss'
import { ThermalSensorSize, useApparateContext } from '../apparate'
import { useTranslation } from 'react-i18next'

type CircleOptionId = 'SMALL' | 'MEDIUM' | 'LARGE' | 'X'

type CircleOption = {
    id: CircleOptionId
    label: string
    size: ThermalSensorSize | null
    voltage: number
}

const OPTIONS: CircleOption[] = [
    { id: 'SMALL',  label: '177мм²', size: 'SMALL',  voltage: 60 },
    { id: 'MEDIUM', label: '380мм²', size: 'MEDIUM', voltage: 31 },
    { id: 'LARGE',  label: '491мм²', size: 'LARGE',  voltage: 26 },
    { id: 'X',      label: 'X',      size: null,     voltage: 43 },
]

export const Circles: React.FC = () => {
    const { t } = useTranslation()
    const { setThermalSensorSize, setVoltage, thermalSensorSize, currentToggle, enabled } = useApparateContext()

    const [selectedId, setSelectedId] = useState<CircleOptionId | null>(null)


    const isDisplayActive = enabled && currentToggle === 3


    const currentVoltage = useMemo(() => {
        if (selectedId === null) return 100
        const opt = OPTIONS.find(o => o.id === selectedId)
        return opt ? opt.voltage : 100
    }, [selectedId])

    const displayVoltage = isDisplayActive ? currentVoltage : 0

    const handleClick = (id: CircleOptionId) => {
        setSelectedId(prev => (prev === id ? null : id))

        const opt = OPTIONS.find(o => o.id === id)!
        setThermalSensorSize(opt.size)
    }


    useEffect(() => {
        if (!thermalSensorSize) {
            return
        }

        const match = OPTIONS.find(o => o.size === thermalSensorSize)?.id ?? null
        if (match && match !== selectedId) setSelectedId(match)
    }, [thermalSensorSize, selectedId])

    useEffect(() => {
        setVoltage(displayVoltage)
    }, [displayVoltage, setVoltage])

    return (
        <div>
            <h1 className={styles.title}>{t('photoresistorTitle.title')}</h1>

            <div className={styles.wrapper}>
                {OPTIONS.map(opt => (
                    <button
                        key={opt.id}
                        type="button"
                        className={`${getCircleClass(styles, opt.id)} ${selectedId === opt.id ? styles.active : ''}`}
                        onClick={() => handleClick(opt.id)}
                    >
                        {opt.id === 'X' ? (
                            opt.label
                        ) : (
                            <>
                                {opt.label.replace('²', '')}
                                <sup>2</sup>
                            </>
                        )}
                    </button>
                ))}
            </div>

            <div className={styles.voltageBox}>
                Напруга: {displayVoltage} В
            </div>
        </div>
    )
}

function getCircleClass(styles: any, id: CircleOptionId) {
    if (id === 'SMALL') return styles.circleSmall
    if (id === 'MEDIUM') return styles.circleMedium
    if (id === 'LARGE') return styles.circleBig
    return styles.circleX
}
