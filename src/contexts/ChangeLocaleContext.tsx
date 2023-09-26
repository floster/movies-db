import { FC, createContext, useContext } from "react";
import { AvalableLocales } from "../js/config";
import { useLocalStorage } from "usehooks-ts";

const DEFAULT_LOCALE = import.meta.env.VITE_DEFAULT_LOCALE;

interface ChangeLocaleState {
  currentLocale: AvalableLocales;
  changeLocale: (locale: AvalableLocales) => void;
}

const ChangelocaleContext = createContext<ChangeLocaleState>({
  currentLocale: DEFAULT_LOCALE,
  changeLocale: () => {},
});
export const useChangeLocale = () => useContext(ChangelocaleContext);

type Props = {
  children: React.ReactNode;
};
export const ChangeLocaleProvider: FC<Props> = ({ children }) => {
  const defaultLocale = DEFAULT_LOCALE;
  const [currentLocale, setLocale] = useLocalStorage(
    "currentLocale",
    defaultLocale,
  );

  const change = (locale: AvalableLocales) => {
    setLocale(locale);
  };

  return (
    <ChangelocaleContext.Provider
      value={{
        currentLocale,
        changeLocale: change,
      }}
    >
      {children}
    </ChangelocaleContext.Provider>
  );
};
