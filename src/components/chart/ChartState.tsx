import { Point } from "chart.js"
import React, { createContext, useContext, useState } from "react"

const ChartTypes = ["PHOTORESISTOR", "WEIGHT", "THERMOSENSOR"] as const
export type ChartType = (typeof ChartTypes)[number]

interface InternalChartState {
    dataStore: Map<ChartType, Point[]>
    addPoint: (_pointId: string, point: Point, chartType: ChartType) => void
}

export interface ChartState {
    data: Point[]
    addPoint: (pointId: string, point: Point) => void
}

const MAX_LAST_RESULTS = 4

const ChartContext = createContext<InternalChartState>({
    dataStore: new Map(),
    addPoint: () => {},
})

export const ChartContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [dataStore, setDataStore] = useState<Map<ChartType, Point[]>>(new Map())

    const addPoint = (_pointId: string, point: Point, chartType: ChartType) => {
        setDataStore((prev) => {
            const next = new Map(prev)
            const data = next.get(chartType) ?? []

            const x = Number(point.x)
            const y = Number(point.y)

            // ✅ WEIGHT: один вес (x) -> одна точка. Всегда обновляем/перезаписываем.
            if (chartType === "WEIGHT") {
                const idx = data.findIndex((p) => Number(p.x) === x)

                const newData =
                    idx >= 0 ? data.map((p, i) => (i === idx ? { x, y } : p)) : [...data, { x, y }]

                next.set(chartType, [...newData].sort((a, b) => Number(a.x) - Number(b.x)))
                return next
            }

            // ✅ Остальные: не добавляем подряд одинаковое, храним последние 4
            const last = data[data.length - 1]
            if (last && Number(last.x) === x && Number(last.y) === y) return prev

            next.set(chartType, [...data, { x, y }].slice(-MAX_LAST_RESULTS))
            return next
        })
    }

    return <ChartContext.Provider value={{ dataStore, addPoint }}>{children}</ChartContext.Provider>
}

export const useChartContext = (chartType: ChartType): ChartState => {
    const internal = useContext(ChartContext)
    return {
        data: internal.dataStore.get(chartType) ?? [],
        addPoint: (pointId: string, point: Point) => internal.addPoint(pointId, point, chartType),
    }
}
