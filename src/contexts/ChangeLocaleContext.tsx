import { FC, createContext, useContext, useState } from "react";
import { AvalableLocales, DEFAULT_LOCALE } from "../js/config";

interface ChangeLocaleState {
    locale: AvalableLocales,
    changeLocale: (locale: AvalableLocales) => void
}

const ChangelocaleContext = createContext<ChangeLocaleState>({ locale: DEFAULT_LOCALE, changeLocale: () => { } });
export const useChangeLocale = () => useContext(ChangelocaleContext);

type Props = {
    children: React.ReactNode;
}
export const ChangeLocaleProvider: FC<Props> = ({ children }) => {
    const defaultLocale = localStorage.getItem('locale') as AvalableLocales || DEFAULT_LOCALE;
    const [locale, setLocale] = useState(defaultLocale);
    const change = (locale: AvalableLocales) => {
        setLocale(locale)
        localStorage.setItem('locale', locale);
    };

    return (
        <ChangelocaleContext.Provider value={{
            locale,
            changeLocale: change
        }}>
            {children}
        </ChangelocaleContext.Provider>
    )
}