import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { InputField } from "../../components/InputField"
import { selectSimulation, setHouseInsurance, setHouseInsuranceTaxes, setOutcome } from "../simulationSlice";
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
                        label={t('Depense')}
                        ariaLabel={t('Depense')}
                        value={simulation.expenses}
                        onChange={(e) => { dispatch(setOutcome(parseInt(e.target.value))) }}
                        ></InputField>
                </div>
                <div className={styles.row}>
                    <InputField 
                        label={t('HouseInsurance')}
                        ariaLabel={t('HouseInsurance')}
                        value={simulation.houseInsurance}
                        onChange={(e) => { dispatch(setHouseInsurance(parseFloat(e.target.value))) }}
                        ></InputField>
                </div>
                <div className={styles.row}>
                    <InputField 
                        label={t('HouseInsuranceTaxes')}
                        ariaLabel={t('HouseInsuranceTaxes')}
                        value={simulation.houseInsuranceTaxes}
                        onChange={(e) => { dispatch(setHouseInsuranceTaxes(parseFloat(e.target.value))) }}
                        ></InputField>
                </div>
            </div>
        </div>
    )
}