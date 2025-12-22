import { ChartType, useChartContext } from "./ChartState"
import { Line } from "react-chartjs-2"
import styles from "./Chart.module.css"
import { useTranslation } from "react-i18next"

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
                key={type}
                data={{
                    labels: state.data.map((p) => p.x),
                    datasets: [
                        {
                            label,
                            data: state.data.map((p) => p.y),
                        },
                    ],
                }}
                options={{
                    scales: {
                        x: { title: { display: true, text: xAxisLabel } },
                        y: { title: { display: true, text: t("chart.voltage") } },
                    },
                }}
            />
        </div>
    )
}
