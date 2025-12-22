// ChartState.ts
import { Point } from "chart.js"
import React, { createContext, useContext, useState } from "react"

const ChartTypes = ["PHOTORESISTOR", "WEIGHT", "THERMOSENSOR"] as const
export type ChartType = (typeof ChartTypes)[number]

// point ids per chart
type PointIdStore = Map<ChartType, string[]>

interface InternalChartState {
    dataStore: Map<ChartType, Point[]>
    pointIdStore: PointIdStore
    addPoint: (pointId: string, point: Point, chartType: ChartType) => void
}

export interface ChartState {
    data: Point[]
    addPoint: (pointId: string, point: Point) => void
}

const ChartContext = createContext<InternalChartState>({
    dataStore: new Map(),
    pointIdStore: new Map(),
    addPoint: () => {},
})

export interface ChartContextProviderProps {
    children: React.ReactNode
}

export const ChartContextProvider = ({ children }: ChartContextProviderProps) => {
    const [dataStore, setDataStore] = useState<Map<ChartType, Point[]>>(new Map())
    const [pointIdStore, setPointIdStore] = useState<PointIdStore>(new Map())

    const addPoint = (pointId: string, point: Point, chartType: ChartType) => {
        // 1) ids: обновляем от prev (без гонок), не даём дубликатов
        setPointIdStore((prev) => {
            const next = new Map(prev)
            const ids = next.get(chartType) ?? []
            if (ids.includes(pointId)) return prev
            next.set(chartType, [...ids, pointId])
            return next
        })

        // 2) data: обновляем от prev (без гонок), добавляем и сортируем по x
        setDataStore((prev) => {
            const next = new Map(prev)
            const data = next.get(chartType) ?? []

            // ВАЖНО: сортируем по числовому x
            const sorted = [...data, point].sort((a, b) => Number(a.x) - Number(b.x))

            next.set(chartType, sorted)
            return next
        })
    }

    const value: InternalChartState = {
        dataStore,
        pointIdStore,
        addPoint,
    }

    return <ChartContext.Provider value={value}>{children}</ChartContext.Provider>
}

export const useChartContext = (chartType: ChartType): ChartState => {
    const internalState = useContext(ChartContext)

    // ВАЖНО: без useMemo — чтобы всегда обновлялось при изменении контекста
    return {
        data: internalState.dataStore.get(chartType) ?? [],
        addPoint: (pointId: string, point: Point) => {
            internalState.addPoint(pointId, point, chartType)
        },
    }
}
