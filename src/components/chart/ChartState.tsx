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
    clear: (chartType: ChartType) => void
}

export interface ChartState {
    data: Point[]
    regressionData: Point[]
    addPoint: (pointId: string, point: Point) => void
    clear: () => void
}

const ChartContext = createContext<InternalChartState>({
    dataStore: new Map(),
    pointIdStore: new Map(),
    addPoint: () => { },
    clear: () => { }
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
        },
        clear: (chartType: ChartType) => {
            setPointIdStore(
                pointIdStore => new Map<string, string[]>(
                    [...pointIdStore, [chartType, []]]
                )
            )
            setDataStore(
                dataStore => new Map<string, Point[]>(
                    [...dataStore, [chartType, []]]
                )
            )
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

    const regressionData = useMemo(() => {
        const points = internalState.dataStore.get(chartType) || [];
        if (points.length < 2) return [];

        const n = points.length;
        let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;

        points.forEach(p => {
            sumX += p.x;
            sumY += p.y;
            sumXY += p.x * p.y;
            sumX2 += p.x * p.x;
        });

        const denominator = (n * sumX2 - sumX * sumX);
        if (denominator === 0) return [];

        const slope = (n * sumXY - sumX * sumY) / denominator;
        const intercept = (sumY - slope * sumX) / n;

        const minX = Math.min(...points.map(p => p.x));
        const maxX = Math.max(...points.map(p => p.x));

        return [
            { x: minX, y: slope * minX + intercept },
            { x: maxX, y: slope * maxX + intercept }
        ];
    }, [internalState.dataStore.get(chartType)]);

    const mappedState = useMemo(() => {
        return {
            data: internalState.dataStore.get(chartType) || [],
            regressionData,
            addPoint: (pointId: string, point: Point) => {
                internalState.addPoint(pointId, point, chartType)
            },
            clear: () => {
                internalState.clear(chartType)
            }
        } satisfies ChartState
    }, [internalState.dataStore.get(chartType), regressionData])

    return mappedState
}