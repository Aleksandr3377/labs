import i18next from "i18next";
import {initReactI18next} from "react-i18next";
import translationEnglish from '../../public/translation/en/translation.json'
import translationUkraine from '../../public/translation/ua/translation.json'


const resources = {
    ENG: {
        translation: translationEnglish,
    },
    UA: {
        translation: translationUkraine,
    }
}

const lng = localStorage.getItem('userLang') || 'UA';


i18next
    .use(initReactI18next)

    .init({
        resources,
        lng,
    });

export default i18next;