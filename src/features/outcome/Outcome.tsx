import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { InputField } from "../../components/InputField"
import { selectSimulation, setEnergyCost, setHouseInsurance, setHouseInsuranceTaxes, setMinucipalTaxes, setOutcome, setScollarTaxes } from "../simulationSlice";
import styles from '../Simulation.module.css';

export const Outcome = () => {
    const { t } = useTranslation();
    const simulation = useAppSelector(selectSimulation);
    const dispatch = useAppDispatch();

    return (
        <div>
            <h1>{t('Depense')}</h1>
            <div className={styles.box}>
                <div className={styles.row}>
                    <InputField 
                        type="number"
                        label={t('Depense')}
                        ariaLabel={t('Depense')}
                        value={simulation.expenses}
                        onChange={(e) => { dispatch(setOutcome(parseInt(e.target.value))) }}
                        tooltip={t('DepenseTooltip')}
                        ></InputField>
                </div>
                <div className={styles.row}>
                    <InputField 
                        type="float"
                        label={t('HouseInsurance')}
                        ariaLabel={t('HouseInsurance')}
                        value={simulation.houseInsurance}
                        onChange={(e) => { dispatch(setHouseInsurance(parseFloat(e.target.value))) }}
                        tooltip={t('HouseInsuranceTooltip')}
                        ></InputField>
                </div>
                <div className={styles.row}>
                    <InputField 
                        type="float"
                        label={t('HouseInsuranceTaxes')}
                        ariaLabel={t('HouseInsuranceTaxes')}
                        value={simulation.houseInsuranceTaxes}
                        onChange={(e) => { dispatch(setHouseInsuranceTaxes(parseFloat(e.target.value))) }}
                        tooltip={t('HouseInsuranceTaxesTooltip')}
                        ></InputField>
                </div>
                <div className={styles.row}>
                    <InputField
                        type="number"
                        label={t('MunicipalTaxes')}
                        ariaLabel={t('MunicipalTaxes')}
                        value={simulation.municipalTaxes}
                        onChange={(e) => { dispatch(setMinucipalTaxes(parseInt(e.target.value))) }}
                        tooltip={t('MunicipalTaxesTooltip')}
                        ></InputField>
                </div>
                <div className={styles.row}>
                    <InputField
                        type="number"
                        label={t('SchoolTaxes')}
                        ariaLabel={t('SchoolTaxes')}
                        value={simulation.scollarTaxes}
                        onChange={(e) => { dispatch(setScollarTaxes(parseInt(e.target.value))) }}
                        tooltip={t('SchoolTaxesTooltip')}
                        ></InputField>
                </div>
                <div className={styles.row}>
                    <InputField
                        type="number"
                        label={t('EnergyCost')}
                        ariaLabel={t('EnergyCost')}
                        value={simulation.energyCost}
                        onChange={(e) => { dispatch(setEnergyCost(parseInt(e.target.value))) }}
                        tooltip={t('EnergyCostTooltip')}
                        ></InputField>
                </div>

                <div className={styles.row}>
                    <h5>{t('DepenseAdditionnel')}</h5>
                </div>
                <div className={styles.row}>
                    <ul>
                        {simulation.aditionnalOutcome.map((income, index) => {
                            return <li key={income.description}>{income.description} - {income.amount}$</li>
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}