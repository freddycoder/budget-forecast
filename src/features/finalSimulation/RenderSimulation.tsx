import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../app/hooks";
import { format } from "../../utils/formatUtil";
import { selectSimulation } from "../simulationSlice";

export const RenderSimulation = () => {
    const { t } = useTranslation();
    const simulation = useAppSelector(selectSimulation);

    return (
        <div>
            <h1>{t('Simulation')}</h1>

            <table>
                <thead>
                    <tr>
                        <th>{t('Mount')}</th>
                        <th>{t('Income')}</th>
                        <th>{t('Expense')}</th>
                        <th>{t('MortagePayment')}</th>
                        <th>{t('Difference')}</th>
                        <th>{t('Balance')}</th>
                    </tr>
                </thead>
                <tbody>
                    {simulation.simulationTable.map((item, index) => (
                        <tr key={index}>
                            <td>{item.mount}</td>
                            <td>{format(item.income)}</td>
                            <td>{format(item.expenses)}</td>
                            <td>{format(item.mortgagePayment)}</td>
                            <td>{format(item.diff)}</td>
                            <td>{format(item.solde)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}