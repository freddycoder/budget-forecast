import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { InputField } from "../../components/InputField"
import { 
    selectSimulation, 
    setEnergyCost, 
    setHouseInsurance, 
    setHouseInsuranceTaxes, 
    setMinucipalTaxes, 
    setOutcome, 
    setScollarTaxes,
    addAdditionalOutcome, 
    removeAdditionalOutcome,
    updateAdditionalOutcomeDescription,
    updateAdditionalOutcomeAmount } from "../simulationSlice";
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
                        symbol="$"
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
                        symbol="$"
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
                        symbol="%"
                        ></InputField>
                </div>
                <div className={styles.row}>
                    <InputField
                        type="float"
                        label={t('MunicipalTaxes')}
                        ariaLabel={t('MunicipalTaxes')}
                        value={simulation.municipalTaxes}
                        onChange={(e) => { dispatch(setMinucipalTaxes(parseFloat(e.target.value))) }}
                        tooltip={t('MunicipalTaxesTooltip')}
                        symbol="$"
                        ></InputField>
                </div>
                <div className={styles.row}>
                    <InputField
                        type="float"
                        label={t('SchoolTaxes')}
                        ariaLabel={t('SchoolTaxes')}
                        value={simulation.scollarTaxes}
                        onChange={(e) => { dispatch(setScollarTaxes(parseFloat(e.target.value))) }}
                        tooltip={t('SchoolTaxesTooltip')}
                        symbol="$"
                        ></InputField>
                </div>
                <div className={styles.row}>
                    <InputField
                        type="float"
                        label={t('EnergyCost')}
                        ariaLabel={t('EnergyCost')}
                        value={simulation.energyCost}
                        onChange={(e) => { dispatch(setEnergyCost(parseFloat(e.target.value))) }}
                        tooltip={t('EnergyCostTooltip')}
                        symbol="$"
                        ></InputField>
                </div>

                <div className={styles.row}>
                    <h5>{t('DepenseAdditionnel')}</h5>
                </div>
                <div className={styles.row}>
                    <button className={styles.button} onClick={() => { dispatch(addAdditionalOutcome()) }}>{t('AddOutcome')}</button>
                </div>
                <div className={styles.row}>
                    <ol>
                        {simulation.aditionnalOutcome.map((income, index) => {
                            return <li key={index}>
                                <InputField
                                    type="text"
                                    label={t('Description')}
                                    ariaLabel={t('Description')}
                                    value={income.description}
                                    onChange={(e) => { dispatch(updateAdditionalOutcomeDescription({ index, description: e.target.value })) }}
                                />
                                <InputField
                                    type="number"
                                    label={t('Amount')}
                                    ariaLabel={t('Amount')}
                                    value={income.amount}
                                    onChange={(e) => { dispatch(updateAdditionalOutcomeAmount({ index, amount: parseInt(e.target.value) })) }}
                                    symbol="$"
                                />
                                <button 
                                    className={`${styles.button} ${styles['button-danger']}`} 
                                    onClick={() => { dispatch(removeAdditionalOutcome(index)) }}>{t('Remove')}</button></li>
                        })}
                    </ol>
                </div>
            </div>
        </div>
    )
}