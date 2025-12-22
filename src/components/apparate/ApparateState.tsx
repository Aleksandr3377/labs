import { createContext, useContext, useState } from "react"

const ThermalSensorSizes = [
    'SMALL',
    'MEDIUM',
    'LARGE'
] as const

const CircleSizes = [
    'SMALL',
    'MEDIUM',
    'BIG',
    'BIGGEST',
] as const

export type ThermalSensorSize = typeof ThermalSensorSizes[number] | null
export type CircleSize = typeof CircleSizes[number] | null

export interface ApparateState {
    enabled: boolean
    setEnabled: (enabled: boolean) => void

    voltage: number
    setVoltage: (voltage: number) => void

    currentToggle: number
    setCurrentToggle: (currentToggle: number) => void

    thermalSensorSize: ThermalSensorSize
    setThermalSensorSize: (thermalSensorSize: ThermalSensorSize) => void

    circleWeights: CircleSize
    setCircleWeights: (circleWeights: CircleSize) => void
}

const ApparateContext = createContext<ApparateState>({
    enabled: false,
    setEnabled: () => {},

    voltage: 0,
    setVoltage: () => {},

    currentToggle: 0,
    setCurrentToggle: () => {},

    thermalSensorSize: null,
    setThermalSensorSize: () => {},

    circleWeights: null,
    setCircleWeights: () => {},
})

export interface ApparateContextProviderProps {
    children: React.ReactNode
}

export const ApparateContextProvider = (props: ApparateContextProviderProps) => {
    const [enabled, setEnabled] = useState(false)
    const [voltage, setVoltage] = useState(0)
    const [currentToggle, setCurrentToggle] = useState(0)
    const [thermalSensorSize, setThermalSensorSize] = useState<ThermalSensorSize>(null)
    const [circleWeights, setCircleWeights] = useState<CircleSize>(null)

    const value: ApparateState = { 
        enabled,
        setEnabled,

        voltage, 
        setVoltage, 

        currentToggle, 
        setCurrentToggle, 

        thermalSensorSize, 
        setThermalSensorSize,

        circleWeights,
        setCircleWeights,
    }

    return (
        <ApparateContext.Provider value={value}>
            {props.children}
        </ApparateContext.Provider>
    )
}

export const useApparateContext = () => {
    return useContext(ApparateContext)
}
