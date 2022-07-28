import { Chart } from "react-google-charts";
import { useAppSelector } from "../../app/hooks";
import { selectSimulation } from "../simulationSlice";
import { useTranslation } from "react-i18next";

export function ForecastChart() {
    const simulation = useAppSelector(selectSimulation);
    const { t } = useTranslation();

    const data: any[] = [
        [t('Month'), t('Balance')],
    ]

    for (let i = 0; i < simulation.simulationTable.length; i++) {
        data.push([simulation.simulationTable[i].mount, simulation.simulationTable[i].solde]);
    }

    const options = {
        chart: {
            title: t('BudgetForecast'),
        },
    };

    return (
        <Chart chartType="Line" width="100%" height="400px" data={data} options={options} />
    )
}
