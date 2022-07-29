import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../app/hooks";
import { format } from "../../utils/formatUtil";
import styles from '../Simulation.module.css';
import { selectSimulation } from "../simulationSlice";

export const InsuranceSCHLArray = [
    { ratio: 0.65, prime: 0.006 },
    { ratio: 0.75, prime: 0.017 },
    { ratio: 0.80, prime: 0.024 },
    { ratio: 0.85, prime: 0.028 },
    { ratio: 0.90, prime: 0.031 },
    { ratio: 0.95, prime: 0.040 },
]

export const InsuranceSCHLTaxes = 0.09975;

export function InsuranceSCHL() {
    const { t } = useTranslation();
    const simulation = useAppSelector(selectSimulation);

    return (
        <div>
            <h5>{t('InsuranceSCHL')}</h5>
            <div className={styles.row}>
                <table className={styles.tableSmall}>
                    <thead>
                        <tr>
                            <th>{t('Ratio')}</th>
                            <th>{t('Prime')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {InsuranceSCHLArray.map((item, index) => (
                            <tr key={index}>
                                <td>{item.ratio}</td>
                                <td>{item.prime}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className={styles.infoDiv}>
                    <p>{t('TextInsuranceSCHL')}</p>
                    <p>{t('MessageMontantAssuranceSCHL', {val: format(simulation.insuranceSCHL)})}</p>
                    <p>{t('SCHLTaxesMessage', {val: format(simulation.insuranceSCHL * InsuranceSCHLTaxes)})}</p>
                </div>
            </div>
        </div>
    );
}