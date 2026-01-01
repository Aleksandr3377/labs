import { useMemo } from "react";
import { useApparateContext } from "../apparate";
import styles from "./Voltmeter.module.scss";

const MIN_V = 0;
const MAX_V = 100;

export const Voltmeter = () => {
    const { voltage } = useApparateContext();

    const value = useMemo(() => Math.round(voltage), [voltage]);
    const clamped = useMemo(() => Math.max(MIN_V, Math.min(MAX_V, value)), [value]);

    // позиция стрелки: 0..100 (%)
    const pos = useMemo(() => {
        // ограничиваем, чтобы стрелка не упиралась в край
        const safe = Math.max(1, Math.min(99, (clamped / MAX_V) * 100));
        return `${safe}%`;
    }, [clamped]);


    return (
        <div className={styles.meter}>
            <div className={styles.scaleBox}>
                {/* цифры каждые 5 */}
                <div className={styles.labelsRow}>
                    {Array.from({ length: 11 }, (_, i) => i * 10).map((n) => (
                        <div key={n} className={styles.label}>{n}</div>
                    ))}
                </div>

                <div className={styles.ticksRow}>
                    {Array.from({ length: 101 }, (_, i) => {
                        const is10 = i % 10 === 0;
                        const is5 = i % 5 === 0;

                        return (
                            <div key={i} className={styles.tickCell}>
                                <div
                                    className={[
                                        styles.tick,
                                        is10 ? styles.tick10 : is5 ? styles.tick5 : styles.tick1,
                                    ].join(" ")}
                                />
                            </div>
                        );
                    })}
                </div>

                {/* линия шкалы */}
                <div className={styles.scaleLine} />

                {/* стрелка */}
                <div className={styles.vIndicator} style={{ left: pos }} />
            </div>
        </div>
    );
};
