import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { InputField } from "../../components/InputField"
import { selectSimulation, setIncome, setInitialValue } from "../simulationSlice";
import styles from '../Simulation.module.css';

export const Income = () => {
    const { t } = useTranslation();
    const simulation = useAppSelector(selectSimulation);
    const dispatch = useAppDispatch();

    return (
        <div>
            <h1>{t('Revenue')}</h1>
            <div className={styles.box}>
                <div className={styles.row}>
                    <InputField 
                        label={t('Revenue')}
                        ariaLabel={t('Revenue')}
                        value={simulation.income}
                        onChange={(e) => { dispatch(setIncome(parseInt(e.target.value))) }}
                        tooltip={t('RevenueTooltip')}
                        ></InputField>
                </div>
                <div className={styles.row}>
                    <InputField
                        label={t('InitialValue')}
                        ariaLabel={t('InitialValue')}
                        value={simulation.initialValue}
                        onChange={(e) => { dispatch(setInitialValue(parseInt(e.target.value))) }}
                        tooltip={t('InitialValueTooltip')}
                        ></InputField>
                </div>
                <div className={styles.row}>
                    <h5>{t('RevenueAdditionnel')}</h5>
                </div>
                <div className={styles.row}>
                    <ul>
                        {simulation.aditionnalIncomes.map((income, index) => {
                            return <li key={index}>{income.description} - {income.amount}</li>
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}