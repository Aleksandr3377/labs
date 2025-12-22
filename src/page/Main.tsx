// @ts-ignore
import styles from "./Main.module.scss";
import { Circles } from "../components/circles/Circles.tsx";
import { Apparate } from "../components/apparate/Apparate.tsx";
import { ApparateContextProvider } from "../components/apparate";
import { ChartContextProvider } from "../components/chart/ChartState.tsx";
import { Chart } from "../components/chart/Chart.tsx";
import { Switch } from "../components/switch/Switch.tsx";
import { Weight } from "../components/weight/Weight.tsx";
import { ThermoSensor } from "../components/thermoSensor/ThermoSensor.tsx";
import { Table } from "../components/table/Table.tsx";
import Header from "../components/header/Header.tsx";
import "../i18n/i18n.tsx";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Instruction } from "../components/instruction/Instruction.tsx";

export const Main = () => {
  const [selectedComponent, setSelectedComponent] = useState("WEIGHT");
  const { t } = useTranslation();

  return (
    <div>
      <Header />
      <Instruction />
      <ApparateContextProvider>
        <ChartContextProvider>
          <Apparate />

          <Switch />

          <div className={styles.buttonsPagination}>
            <button onClick={() => setSelectedComponent("WEIGHT")}>
              {t("model.strainGauge")}
            </button>
            <button onClick={() => setSelectedComponent("THERMOSENSOR")}>
              {t("model.thermoSensor")}
            </button>
            <button onClick={() => setSelectedComponent("PHOTORESISTOR")}>
              {t("model.photoresistor")}
            </button>
          </div>

          <div className={styles.container}>
            {selectedComponent === "WEIGHT" && (
              <>
                <Weight />
                <Chart
                  label="Тензодатчик"
                  type="WEIGHT"
                  xAxisLabel={t("table.weight")}
                />
                <Table type="WEIGHT" label={t("table.weight")} />
              </>
            )}

            {selectedComponent === "THERMOSENSOR" && (
              <>
                <ThermoSensor />
                <Chart
                  label="Термодатчик"
                  type="THERMOSENSOR"
                  xAxisLabel={t("table.temperature")}
                />
                <Table type="THERMOSENSOR" label={t("table.temperature")} />
              </>
            )}

            {selectedComponent === "PHOTORESISTOR" && (
              <>
                <Circles />
                <Chart
                  label="Фоторезистор"
                  type="PHOTORESISTOR"
                  xAxisLabel={t("table.square")}
                />
                <Table type="PHOTORESISTOR" label={t("table.square")} />
              </>
            )}
          </div>
        </ChartContextProvider>
      </ApparateContextProvider>
    </div>
  );
};
