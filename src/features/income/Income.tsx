import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { InputField } from "../../components/InputField"
import { 
    selectSimulation, 
    setIncome, 
    setInitialValue, 
    addAdditionalIncome, 
    removeAdditionalIncome,
    updateAdditionalIncomeDescription,
    updateAdditionalIncomeAmount,
    updateAdditionalIncomeMonthsDuration
} from "../simulationSlice";
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
                        type="number"
                        label={t('Revenue')}
                        ariaLabel={t('Revenue')}
                        value={simulation.income}
                        onChange={(e) => { dispatch(setIncome(Number.parseInt(e.target.value))) }}
                        tooltip={t('RevenueTooltip')}
                        symbol="$"
                        ></InputField>
                </div>
                <div className={styles.row}>
                    <InputField
                        type="number"
                        label={t('InitialValue')}
                        ariaLabel={t('InitialValue')}
                        value={simulation.initialValue}
                        onChange={(e) => { dispatch(setInitialValue(Number.parseInt(e.target.value))) }}
                        tooltip={t('InitialValueTooltip')}
                        symbol="$"
                        ></InputField>
                </div>
                <div className={styles.row}>
                    <h5>{t('RevenueAdditionnel')}</h5>
                </div>
                <div className={styles.row}>
                    <button className={styles.button} onClick={() => { dispatch(addAdditionalIncome()) }}>{t('AddIncome')}</button>
                </div>
                <div className={styles.row}>
                    <ol>
                        {simulation.aditionnalIncomes.map((income, index) => {
                            return <li key={income.description + index}>
                                <InputField
                                    type="text"
                                    label={t('Description')}
                                    ariaLabel={t('Description')}
                                    value={income.description}
                                    onChange={(e) => { dispatch(updateAdditionalIncomeDescription({ index: index, description: e.target.value })) }}
                                ></InputField>
                                <InputField
                                    type="number"
                                    label={t('Amount')}
                                    ariaLabel={t('Amount')}
                                    value={income.amount}
                                    onChange={(e) => { dispatch(updateAdditionalIncomeAmount({ index: index, amount: Number.parseInt(e.target.value) })) }}
                                    symbol="$"
                                ></InputField>
                                <InputField
                                    type="number"
                                    label={t('NumberOfMonths')}
                                    ariaLabel={t('NumberOfMonths')}
                                    value={income.monthsDuration}
                                    onChange={(e) => { dispatch(updateAdditionalIncomeMonthsDuration({ index: index, monthsDuration: Number.parseInt(e.target.value) })) }}
                                />
                                <button 
                                    className={`${styles.button} ${styles['button-danger']}`} 
                                    onClick={() => { dispatch(removeAdditionalIncome(index)) }}>{t('Remove')}</button></li>
                        })}
                    </ol>
                </div>
            </div>
        </div>
    )
}