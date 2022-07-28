import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { LiHref } from "./components/LiHref.component";
import LangSelector from "./features/languages/LangSelector";

export const NavBar = () => {
    const { t } = useTranslation();

    return (
        <nav>
          <ul>
            <li>
              <Link to="/hypotheque">{t("Hypotheque")}</Link>
            </li>
            <li>
              <Link to="/revenue">{t("Revenue")}</Link>
            </li>
            <li>
              <Link to="/depense">{t("Depense")}</Link>
            </li>
            <li>
              <Link to="/simulation">{t("Simulation")}</Link>
            </li>
            <li>
              <span>{t("LiensUtile")}</span>
              <ul>
                <LiHref
                  href="https://itools-ioutils.fcac-acfc.gc.ca/MC-CH/MC-CH-fra.aspx"
                  text={t("CalculatriceHypothecaireCanada")}></LiHref>
                <LiHref
                  href="https://itools-ioutils.fcac-acfc.gc.ca/BP-PB/planificateur-budgetaire"
                  text={t("PlanificateurBudgetaire")}></LiHref>
                <LiHref
                  href="http://www.calculconversion.com/calcul-pret-hypothecaire.html#:~:text=Formule%20du%20pr%C3%AAt%20hypoth%C3%A9caire%20Le%20versement%20mensuel%20%3D,l%27ann%C3%A9e%29-Nombre%20de%20versements%20%2A%20Nombre%20d%27ann%C3%A9es%20du%20terme"
                  text={t("CommentCalculerPret")}></LiHref>
              </ul>
            </li>
            <li>
              <LangSelector></LangSelector>
            </li>
          </ul>
        </nav>
    )
}