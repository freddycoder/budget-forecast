import { Chart } from "react-google-charts";
import { useAppSelector } from "../../app/hooks";
import { format } from "../../utils/formatUtil";
import { selectSimulation } from "../simulationSlice";

export function MortgageChart() {
    const simulation = useAppSelector(selectSimulation);

    let totalCapital = 0;
    let totalInterest = 0;

    for (let i = 0; i < simulation.paymentTable.length; i++) {
        totalCapital += simulation.paymentTable[i].principal;
        totalInterest += simulation.paymentTable[i].interest;
    }

    const data = [
        ["City", "Capital", "Interest"],
        ["Total", totalCapital, totalInterest],
    ]

    let total = totalCapital + totalInterest;

    const options = {
        title: "Mortgage Chart",
        chartArea: { width: "50%" },
        isStacked: true,
        hAxis: {
            title: `Total cash spend (${format(total)} $)`,
            minValue: 0,
        },
        vAxis: {
            title: "Money",
        }
    };

    return (
        <Chart chartType="BarChart" width="100%" height="400px" data={data} options={options} />
    )
}
