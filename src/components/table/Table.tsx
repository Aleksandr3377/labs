import { useChartContext, ChartType } from "../chart/ChartState";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

interface TableProps {
    type: ChartType;
    label: string;
}

export const Table = ({ type, label }: TableProps) => {
    const { data } = useChartContext(type);
    const { t } = useTranslation();

    const groupedData = useMemo(() => {
        const uniqueX = Array.from(new Set(data.map(p => p.x))).sort((a, b) => a - b);

        return uniqueX.map(xVal => {
            const points = data.filter(p => p.x === xVal);
            const last = points[points.length - 1].y;
            const avg = points.reduce((sum, p) => sum + p.y, 0) / points.length;

            return {
                x: xVal,
                last: last.toFixed(1),
                avg: avg.toFixed(1)
            };
        });
    }, [data]);

    if (data.length === 0) return null;

    return (
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', width: '100%', overflowX: 'auto' }}>
            <table style={{ borderCollapse: 'collapse', border: '1px solid black', backgroundColor: 'white' }}>
                <thead>
                <tr>
                    <th style={{ border: '1px solid black', padding: '8px 12px', fontWeight: 'bold' }}>{label}:</th>
                    {groupedData.map((item, index) => (
                        <td key={index} style={{ border: '1px solid black', padding: '8px 12px', textAlign: 'center' }}>{item.x}</td>
                    ))}
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th style={{ border: '1px solid black', padding: '8px 12px', fontWeight: 'bold' }}>{t("table.voltage")}:</th>
                    {groupedData.map((item, index) => (
                        <td key={index} style={{ border: '1px solid black', padding: '8px 12px', textAlign: 'center' }}>{item.last}</td>
                    ))}
                </tr>
                <tr>
                    <th style={{ border: '1px solid black', padding: '8px 12px', fontWeight: 'bold' }}>{t("table.average") || "Середнє"}:</th>
                    {groupedData.map((item, index) => (
                        <td key={index} style={{ border: '1px solid black', padding: '8px 12px', textAlign: 'center' }}>{item.avg}</td>
                    ))}
                </tr>
                </tbody>
            </table>
        </div>
    );
};