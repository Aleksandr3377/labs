import { ChartType, useChartContext } from "./ChartState"
import { Line } from "react-chartjs-2"
import styles from "./Chart.module.css"
import { useTranslation } from "react-i18next"
import { ScatterDataPoint } from "chart.js"


export interface ChartProps {
    type: ChartType
    label: string
    xAxisLabel: string
}

export const Chart = ({ type, label, xAxisLabel }: ChartProps) => {
    const state = useChartContext(type)
    const { t } = useTranslation()

    return (
        <div className={styles["chart-container"]}>
            <Line
                redraw
                data={{
                    // ✅ labels не нужны, когда данные = {x,y}
                    datasets: [
                        {
                            label,
                            data: state.data as ScatterDataPoint[]
                        },
                    ],
                }}
                options={{
                    animation: false,
                    parsing: false, // ✅ важно: говорим chart.js что data уже {x,y}
                    scales: {
                        x: {
                            type: "linear", // ✅ числовая ось
                            title: { display: true, text: xAxisLabel },
                        },
                        y: {
                            title: { display: true, text: t("chart.voltage") },
                        },
                    },
                }}
            />
        </div>
    )
}
