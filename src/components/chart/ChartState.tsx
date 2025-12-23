import { Point } from "chart.js";
import { createContext, useContext, useMemo, useState } from "react";

const ChartTypes = ['PHOTORESISTOR', 'WEIGHT', 'THERMOSENSOR'] as const;

export type ChartType = typeof ChartTypes[number];

// Определение структуры данных
type PointIdStore = Record<string, string[]>;

interface InternalChartState {
    dataStore: Record<string, Point[]>;
    pointIdStore: PointIdStore;

    addPoint: (pointId: string, point: Point, chartType: ChartType) => void;
    clear: (chartType: ChartType) => void;
}

export interface ChartState {
    data: Point[];
    regressionData: Point[];
    addPoint: (pointId: string, point: Point) => void;
    clear: () => void;
}

const ChartContext = createContext<InternalChartState>({
    dataStore: {},
    pointIdStore: {},
    addPoint: () => {},
    clear: () => {},
});

export interface ChartContextProviderProps {
    children: React.ReactNode;
}

export const ChartContextProvider = ({ children }: ChartContextProviderProps) => {
    const [dataStore, setDataStore] = useState<Record<string, Point[]>>({});
    const [pointIdStore, setPointIdStore] = useState<PointIdStore>({});

    const value: InternalChartState = {
        dataStore,
        pointIdStore,

        addPoint: (pointId: string, point: Point, chartType: ChartType) => {
            setPointIdStore((prev) => ({
                ...prev,
                [chartType]: prev[chartType]
                    ? [...new Set([...prev[chartType], pointId])]
                    : [pointId],
            }));

            setDataStore((prev) => {
                const updatedPoints = prev[chartType]
                    ? [...prev[chartType], point].sort((a, b) => a.x - b.x)
                    : [point];
                return { ...prev, [chartType]: updatedPoints };
            });
        },

        clear: (chartType: ChartType) => {
            setPointIdStore((prev) => ({ ...prev, [chartType]: [] }));
            setDataStore((prev) => ({ ...prev, [chartType]: [] }));
        },
    };

    return (
        <ChartContext.Provider value={value}>{children}</ChartContext.Provider>
    );
};

export const useChartContext = (chartType: ChartType): ChartState => {
    const internalState = useContext(ChartContext);

    // Рассчитать регрессионную линию
    const regressionData = useMemo(() => {
        const points = internalState.dataStore[chartType] || [];
        if (points.length < 2) return [];

        const n = points.length;
        let sumX = 0,
            sumY = 0,
            sumXY = 0,
            sumX2 = 0;

        points.forEach((p) => {
            sumX += p.x;
            sumY += p.y;
            sumXY += p.x * p.y;
            sumX2 += p.x * p.x;
        });

        const divisor = n * sumX2 - sumX * sumX;
        if (divisor === 0) return [];

        const slope = (n * sumXY - sumX * sumY) / divisor;
        const intercept = (sumY - slope * sumX) / n;

        const minX = Math.min(...points.map((p) => p.x));
        const maxX = Math.max(...points.map((p) => p.x));

        return [
            { x: minX, y: slope * minX + intercept },
            { x: maxX, y: slope * maxX + intercept },
        ];
    }, [internalState.dataStore[chartType]]);

    return useMemo(
        () => ({
            data: internalState.dataStore[chartType] || [],
            regressionData,
            addPoint: (pointId: string, point: Point) => {
                internalState.addPoint(pointId, point, chartType);
            },
            clear: () => {
                internalState.clear(chartType);
            },
        }),
        [internalState, regressionData, chartType]
    );
};