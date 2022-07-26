import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { InputField } from "../../components/InputField"
import { selectSimulation, setOutcome } from "../simulationSlice";

export const Outcome = () => {
    const { t } = useTranslation();
    const simulation = useAppSelector(selectSimulation);
    const dispatch = useAppDispatch();

    return (
        <div>
            <h1>{t('Outcome')}</h1>
            <InputField 
                label={t('Outcome')}
                ariaLabel={t('Outcome')}
                value={simulation.expenses}
                onChange={(e) => { dispatch(setOutcome(parseInt(e.target.value))) }}
                ></InputField>
        </div>
    )
}