// ApparateContext.tsx
import React, { createContext, useContext, useState } from "react"

const ThermalSensorSizes = ["SMALL", "MEDIUM", "LARGE"] as const
const CircleSizes = ["SMALL", "MEDIUM", "BIG", "BIGGEST"] as const

export type ThermalSensorSize = (typeof ThermalSensorSizes)[number] | null
export type CircleSize = (typeof CircleSizes)[number] | null

export interface ApparateState {
    enabled: boolean
    setEnabled: React.Dispatch<React.SetStateAction<boolean>>

    voltage: number
    setVoltage: React.Dispatch<React.SetStateAction<number>>

    currentToggle: number
    setCurrentToggle: React.Dispatch<React.SetStateAction<number>>

    thermalSensorSize: ThermalSensorSize
    setThermalSensorSize: React.Dispatch<React.SetStateAction<ThermalSensorSize>>

    circleWeights: CircleSize
    setCircleWeights: React.Dispatch<React.SetStateAction<CircleSize>>
}

const ApparateContext = createContext<ApparateState | null>(null)

export interface ApparateContextProviderProps {
    children: React.ReactNode
}

export const ApparateContextProvider = ({ children }: ApparateContextProviderProps) => {
    const [enabled, setEnabled] = useState<boolean>(false)
    const [voltage, setVoltage] = useState<number>(0)
    const [currentToggle, setCurrentToggle] = useState<number>(0)
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

    return <ApparateContext.Provider value={value}>{children}</ApparateContext.Provider>
}

export const useApparateContext = (): ApparateState => {
    const ctx = useContext(ApparateContext)
    if (!ctx) throw new Error("useApparateContext must be used inside <ApparateContextProvider>")
    return ctx
}
