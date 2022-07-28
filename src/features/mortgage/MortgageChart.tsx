import { Chart } from "react-google-charts";
import { useAppSelector } from "../../app/hooks";
import { format } from "../../utils/formatUtil";
import { selectSimulation } from "../simulationSlice";
import styles from '../Simulation.module.css'
import { useTranslation } from "react-i18next";

export function MortgageChart() {
    const simulation = useAppSelector(selectSimulation);
    const { t } = useTranslation();

    let totalCapital = 0;
    let totalInterest = 0;

    for (let i = 0; i < simulation.paymentTable.length; i++) {
        totalCapital += simulation.paymentTable[i].principal;
        totalInterest += simulation.paymentTable[i].interest;
    }

    const data = [
        [t('Hypotheque'), t('Principal'), t('Interest')],
        [t('Total'), totalCapital, totalInterest],
    ]

    let total = totalCapital + totalInterest;

    const options = {
        title: t('MortgageChartTitle'),
        chartArea: { width: "50%" },
        isStacked: true,
        hAxis: {
            title: t('TotalMoneySpend', { val: format(total) }),
            minValue: 0,
        },
        vAxis: {
            title: t('Money'),
        }
    };

    return (
        <div className={styles.chartDiv}>
            <Chart chartType="BarChart" width="100%" height="400px" data={data} options={options} />
        </div>
    )
}
