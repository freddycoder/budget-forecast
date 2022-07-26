import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { InputField } from "../../components/InputField"
import { selectSimulation, setIncome, setInitialValue } from "../simulationSlice";

export const Income = () => {
    const { t } = useTranslation();
    const simulation = useAppSelector(selectSimulation);
    const dispatch = useAppDispatch();

    return (
        <div>
            <h1>{t('Income')}</h1>
            <InputField 
                label={t('Income')}
                ariaLabel={t('Income')}
                value={simulation.income}
                onChange={(e) => { dispatch(setIncome(parseInt(e.target.value))) }}
                ></InputField>
            <InputField
                label={t('InitialValue')}
                ariaLabel={t('InitialValue')}
                value={simulation.initialValue}
                onChange={(e) => { dispatch(setInitialValue(parseInt(e.target.value))) }}
                ></InputField>
        </div>
    )
}