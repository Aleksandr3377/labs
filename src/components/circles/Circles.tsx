import React, { useEffect, useMemo, useState } from 'react'
import styles from './Circles.module.scss'
import { useApparateContext, PhotoresistorAperture } from '../apparate'
import { useTranslation } from 'react-i18next'

type CircleOptionId = 'SMALL' | 'MEDIUM' | 'LARGE' | 'X'

type CircleOption = {
    id: CircleOptionId
    label: string
    aperture: PhotoresistorAperture
    voltage: number
}

const OPTIONS: CircleOption[] = [
    { id: 'SMALL',  label: '177мм²', aperture: 'SMALL',  voltage: 60 },
    { id: 'MEDIUM', label: '380мм²', aperture: 'MEDIUM', voltage: 31 },
    { id: 'LARGE',  label: '491мм²', aperture: 'LARGE',  voltage: 26 },
    { id: 'X',      label: 'X',      aperture: 'OPEN',   voltage: 43 },
]

export const Circles: React.FC = () => {
    const { t } = useTranslation()
    const {
        setPhotoresistorAperture,
        photoresistorAperture,
        setVoltage,
        currentToggle,
        enabled,
    } = useApparateContext()

    const [selectedId, setSelectedId] = useState<CircleOptionId | null>(null)

    const isDisplayActive = enabled && currentToggle === 3

    const currentVoltage = useMemo(() => {
        // ✅ если ничего не выбрано — 100
        if (selectedId === null) return 100
        const opt = OPTIONS.find(o => o.id === selectedId)
        return opt ? opt.voltage : 100
    }, [selectedId])

    const displayVoltage = isDisplayActive ? currentVoltage : 0

    const handleClick = (id: CircleOptionId) => {
        setSelectedId(prev => (prev === id ? null : id))

        const opt = OPTIONS.find(o => o.id === id)!
        setPhotoresistorAperture(opt.aperture)
    }

    // синхронизация с контекстом (если aperture меняется извне)
    useEffect(() => {
        if (!photoresistorAperture) return

        const match = OPTIONS.find(o => o.aperture === photoresistorAperture)?.id ?? null
        if (match && match !== selectedId) setSelectedId(match)
    }, [photoresistorAperture, selectedId])

    // одно место где пишем напряжение в общий вольтметр
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
