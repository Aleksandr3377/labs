import styles from './Instruction.module.css'
import { useTranslation } from "react-i18next";

export const Instruction = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.main}>
      <header className={styles.header}>{t("instruction.header")}</header>

      <p>{t("instruction.paragraph1")}</p>
      <p>{t("instruction.paragraph2")}</p>
      <p>{t("instruction.paragraph3")}</p>
      <p>{t("instruction.paragraph4")}</p>
      <p>{t("instruction.paragraph5")}</p>
    </div>
  );
};
