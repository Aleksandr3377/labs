import styles from './Table.module.css'
import { ChartType, useChartContext } from '../chart';
import {useTranslation} from "react-i18next";

export interface TableProps {
    type: ChartType
    label: string
}

export const Table = ({ label, type }: TableProps) => {
    const state = useChartContext(type)
    const { t } = useTranslation()

    return (
        <div className={styles.table}>
            <table>
                <tbody>
                <tr>
                    <th>{label}:</th>
                    {state.data.map(point => (
                        <td key={point.x}>{point.x}</td>
                        ))}
                </tr>
                <tr>
                    <th>{t("table.voltage")}:</th>
                    {state.data.map(point => (
                        <td key={point.x}>{point.y}</td>
                        ))}
                </tr>
                </tbody>
            </table>
        </div>
    );
}