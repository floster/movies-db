import { FC, createContext, useContext, useState } from "react";
import { AvalableLocales } from "../js/config";
import { getCurrentLocale } from "../js/helpers";

interface ChangeLocaleState {
    locale: AvalableLocales,
    changeLocale: (locale: AvalableLocales) => void
}

const ChangelocaleContext = createContext<ChangeLocaleState>({ locale: getCurrentLocale(), changeLocale: () => { } });
export const useChangeLocale = () => useContext(ChangelocaleContext);

type Props = {
    children: React.ReactNode;
}
export const ChangeLocaleProvider: FC<Props> = ({ children }) => {
    const defaultLocale = getCurrentLocale();
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