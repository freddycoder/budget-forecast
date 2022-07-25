import { useTranslation } from "react-i18next";
import { InputField } from "../../components/InputField"

export const Income = () => {
    const { t } = useTranslation();

    return (
        <div>
            <h1>{t('Income')}</h1>
            <InputField 
                label={t('Income')}
                ariaLabel={t('Income')}
                value="0"
                onChange={(e) => { return; }}
                ></InputField>
        </div>
    )
}