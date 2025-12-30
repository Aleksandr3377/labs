import React, { useState, useMemo, useEffect } from 'react';
import styles from './Weight.module.scss';
import { useApparateContext, CircleSize } from '../apparate';

interface WeightData {
    id: string;
    label: string;
    circleSize: CircleSize;
    voltage: number;
}

const WEIGHT_OPTIONS: WeightData[] = [
    { id: 'm1', label: '37.5', circleSize: 'SMALL',   voltage: 14 },
    { id: 'm2', label: '42',   circleSize: 'MEDIUM',  voltage: 13 },
    { id: 'm3', label: '45.9', circleSize: 'BIG',     voltage: 15 },
    { id: 'mx', label: 'Mx',   circleSize: 'BIGGEST', voltage: 29 },
];

const Weight: React.FC = () => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const apparateContext = useApparateContext();
    const { enabled, currentToggle, setVoltage, setCircleWeights } = apparateContext;

    const toggleWeight = (id: string) => {
        setSelectedIds((prev) => {
            if (id === 'mx') return prev.includes('mx') ? [] : ['mx'];
            const filtered = prev.filter(item => item !== 'mx');
            return filtered.includes(id) ? filtered.filter(i => i !== id) : [...filtered, id];
        });
    };

    const currentVoltage = useMemo(() => {
        if (selectedIds.includes('mx')) return 29;
        return selectedIds.reduce((sum, id) => {
            const w = WEIGHT_OPTIONS.find(opt => opt.id === id);
            return sum + (w ? w.voltage : 0);
        }, 0);
    }, [selectedIds]);

    const isDisplayActive = enabled && currentToggle === 0;
    const displayVoltage = isDisplayActive ? currentVoltage : 0;

    useEffect(() => {
        setVoltage(displayVoltage);

        const lastWeight = selectedIds.length > 0
            ? WEIGHT_OPTIONS.find(w => w.id === selectedIds[selectedIds.length - 1])
            : null;

        setCircleWeights(lastWeight ? lastWeight.circleSize : null);
    }, [displayVoltage, selectedIds, enabled, currentToggle, setVoltage, setCircleWeights]);

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Оберіть вагу тягарця</h2>

            <div className={styles.container}>
                {WEIGHT_OPTIONS.map((weight) => (
                    <button
                        key={weight.id}
                        type="button"
                        className={`${styles.circle} ${selectedIds.includes(weight.id) ? styles.active : ''}`}
                        onClick={() => toggleWeight(weight.id)}
                    >
                        {weight.label}
                    </button>
                ))}
            </div>

            <div style={{
                marginTop: '30px',
                fontSize: '24px',
                fontWeight: 'bold',
                textAlign: 'center',
                color: '#333',
                padding: '10px',
                border: '2px solid #816666',
                borderRadius: '8px',
                backgroundColor: '#f5f5f5',
                width: 'fit-content',
                margin: '30px auto 0'
            }}>
                Напруга: {displayVoltage} В
            </div>
        </div>
    );
};

export default Weight;