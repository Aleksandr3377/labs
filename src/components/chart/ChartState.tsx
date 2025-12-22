import { Point } from "chart.js";
import { createContext, useContext, useMemo, useState } from "react";

const ChartTypes = [
    'PHOTORESISTOR',
    'WEIGHT',
    'THERMOSENSOR',
] as const

export type ChartType = typeof ChartTypes[number]

// Identify if point is already added into store
type PointIdStore = Map<string, string[]>

interface InternalChartState {
    dataStore: Map<string, Point[]>
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
    addPoint: () => { }
})

export interface ChartContextProviderProps {
    children: React.ReactNode
}

export const ChartContextProvider = (props: ChartContextProviderProps) => {
    const [dataStore, setDataStore] = useState<Map<string, Point[]>>(new Map())
    const [pointIdStore, setPointIdStore] = useState<PointIdStore>(new Map())
    const value: InternalChartState = {
        dataStore,
        pointIdStore,
        addPoint: (pointId: string, point: Point, chartType: ChartType) => {
            if (!pointIdStore.has(chartType)) {
                setPointIdStore(
                    pointIdStore => new Map<string, string[]>(
                        [...pointIdStore, [chartType, []]]
                    )
                )
            }
            if (!dataStore.has(chartType)) {
                setDataStore(
                    dataStore => new Map<string, Point[]>(
                        [...dataStore, [chartType, []]]
                    )
                )
            }

            const chartPointIds = pointIdStore.get(chartType) || []
            const chartData = dataStore.get(chartType) || []

            if(!chartPointIds.includes(pointId)) {
                setPointIdStore(
                    pointIdStore => new Map<string, string[]>(
                        [...pointIdStore, [chartType, [...chartPointIds, pointId]]]
                    )
                )
                setDataStore(
                    dataStore => new Map<string, Point[]>(
                        [...dataStore, [chartType, [...chartData, point].sort((a, b) => a.x - b.x)]]
                    )
                )
            }
        }
    }
    return (
        <ChartContext.Provider value={value}>
            {props.children}
        </ChartContext.Provider>
    )
}

export const useChartContext = (chartType: ChartType): ChartState => {
    const internalState = useContext(ChartContext)

    const mappedState = useMemo(() => {
        return {
            data: internalState.dataStore.get(chartType) || [],
            addPoint: (pointId: string, point: Point) => {
                internalState.addPoint(pointId, point, chartType)
            }
        } satisfies ChartState
    }, [internalState.dataStore.get(chartType)])

    return mappedState
}