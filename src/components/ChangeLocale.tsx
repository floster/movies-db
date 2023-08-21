import { AvalableLocales, LOCALES } from "../js/config";
import AppSelect from "./AppSelect";
import { useChangeLocale } from "../contexts/ChangeLocaleContext";

const ChangeLocale = () => {
    const { locale, changeLocale } = useChangeLocale();

    return (
        <>
            <AppSelect
                options={LOCALES}
                currentOption={locale}
                optionChanged={(locale) => changeLocale(locale as AvalableLocales)}
            />
        </>
    );
}

export default ChangeLocale;