import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
 
const LangSelector = () => {
  const { i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(i18n.language);
 
  const changeLanguage = (event: any) => {
    setSelectedLang(event.target.value);
    i18n.changeLanguage(event.target.value);
  }
 
  return (
    <div>
      <label className="mr10">
        <input type="radio" value="fr" name="language" checked={selectedLang === 'fr'}  onChange={changeLanguage} /> Français
      </label>
      <label>
        <input type="radio" value="en" name="language" checked={selectedLang === 'en'}  onChange={changeLanguage} /> English
    </label>
    </div>
  )
}
 
export default LangSelector;