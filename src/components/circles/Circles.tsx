// Circles.tsx
import { useEffect } from "react"
import styles from "./Circles.module.scss"
import { useApparateContext } from "../apparate"
import { useChartContext } from "../chart"
import { useTranslation } from "react-i18next"

type WeightValue = { weight: number; voltage: number }

const getWeightValue = (weight: number): WeightValue => ({
    weight,
    voltage: Math.floor(Math.random() * 15) + 20, // пример
})

export const Circles = () => {
    const { setVoltage, currentToggle, enabled } = useApparateContext()

    // ✅ точки идут в график веса
    const { addPoint } = useChartContext("WEIGHT")
    const { t } = useTranslation()

    const applyWeight = (weight: number) => {
        if (!enabled) return

        // ⚠️ проверь, какой toggle соответствует ВЕСУ
        // если не 3 — поставь правильный
        if (currentToggle !== 3) return

        const value = getWeightValue(weight)
        const x = value.weight
        const y = value.voltage

        setVoltage(y)
        addPoint(`${x}:${y}`, { x, y })
    }

    useEffect(() => {
        if (currentToggle !== 3 || !enabled) setVoltage(0)
    }, [currentToggle, enabled, setVoltage])

    return (
        <div>
            <h1 className={styles.title}>{t("weightTitle.title")}</h1>

            <div className={styles.wrapper}>
                <button type="button" onClick={() => applyWeight(96.5)}>96,5</button>
                <button type="button" onClick={() => applyWeight(98.2)}>98,2</button>
                <button type="button" onClick={() => applyWeight(99.2)}>99,2</button>
                <button type="button" onClick={() => applyWeight(101.5)}>101,5</button>
            </div>
        </div>
    )
}
