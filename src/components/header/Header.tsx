import styles from './Header.module.css'
import { useTranslation } from "react-i18next";

const Header = () => {
    const language = localStorage.getItem('userLang') || "UA";
    const { i18n } = useTranslation();
    const { t } = useTranslation()

    const updateLang = (lang: string) => {
        localStorage.setItem('userLang', lang);
        i18n.changeLanguage(lang);
    }

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>{t("mainTitle.title")}</h1>

            <div className={styles.languages}>
                <p className={(language === 'UA' ? styles.activeLang : styles.notActiveLAng)}
                   onClick={() => updateLang('UA')}>UA</p>
                <p className={styles.activeLang}>|</p>
                <p className={(language === 'ENG' ? styles.activeLang : styles.notActiveLAng)}
                   onClick={() => updateLang('ENG')}>ENG</p>
            </div>
        </div>
    );
};

export default Header;