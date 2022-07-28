import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../app/hooks";
import { format } from "../../utils/formatUtil";
import { selectSimulation } from "../simulationSlice";
import styles from '../Simulation.module.css';
import { ForecastChart } from "./ForcastChart";

export const RenderSimulation = () => {
    const { t } = useTranslation();
    const simulation = useAppSelector(selectSimulation);

    return (
        <div>
            <h1>{t('Simulation')}</h1>

            <ForecastChart />

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>{t('Month')}</th>
                        <th>{t('Revenue')}</th>
                        <th>{t('Depense')}</th>
                        <th>{t('MortgagePayment')}</th>
                        <th>{t('Difference')}</th>
                        <th>{t('Balance')}</th>
                    </tr>
                </thead>
                <tbody>
                    {simulation.simulationTable.map((item, index) => (
                        <tr key={index}>
                            <td>{item.mount}</td>
                            <td>{format(item.income)} $</td>
                            <td>{format(item.expenses)} $</td>
                            <td>{format(item.mortgagePayment)} $</td>
                            <td>{format(item.diff)} $</td>
                            <td>{format(item.solde)} $</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}