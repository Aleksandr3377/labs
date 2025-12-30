import { useEffect } from 'react';
import styles from './Switch.module.scss';
import { useApparateContext } from '../apparate';

export const Switch = () => {
    const {enabled, setEnabled, setVoltage} = useApparateContext()
    useEffect(() => {
        if(!enabled) {
            setVoltage(0)
        }
    }, [enabled])

    return (
        <div className={styles.wrapper}>
            <input 
                type="checkbox" 
                id={styles.highload1} 
                name="highload1" 
                className={styles.highload1}
                onChange={(e) => {
                    if(e.target.checked) {
                        setEnabled(true)
                    } else {
                        setEnabled(false)
                    }
                }} />
        </div>
    );
}
