import { useTranslation } from "react-i18next";
import { InputField } from "../../components/InputField"

export const Outcome = () => {
    const { t } = useTranslation();

    return (
        <div>
            <h1>{t('Outcome')}</h1>
            <InputField 
                label={t('Outcome')}
                ariaLabel={t('Outcome')}
                value="0"
                onChange={(e) => { return; }}
                ></InputField>
        </div>
    )
}