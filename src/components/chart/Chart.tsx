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
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1
                        },
                        {
                            label: t("chart.regression_line") || "Усереднена пряма",
                            data: state.data.map(p => {
                                if (state.regressionData.length < 2) return null;
                                const p1 = state.regressionData[0];
                                const p2 = state.regressionData[1];
                                // Розраховуємо Y для поточного X за формулою прямої
                                return p1.y + (p.x - p1.x) * (p2.y - p1.y) / (p2.x - p1.x);
                            }),
                            borderColor: 'rgba(255, 99, 132, 0.7)',
                            borderDash: [5, 5],
                            pointRadius: 0,
                            fill: false,
                            showLine: true
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
