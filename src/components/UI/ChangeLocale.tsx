import { AvalableLocales, LOCALES } from '../../config/'
import AppSelect from './AppSelect'
import { useChangeLocale } from '../../contexts/ChangeLocaleContext'

const ChangeLocale = () => {
  const { currentLocale, changeLocale } = useChangeLocale()

  return (
    <>
      <AppSelect
        options={LOCALES}
        currentOption={currentLocale}
        optionChanged={locale => changeLocale(locale as AvalableLocales)}
      />
    </>
  )
}

export default ChangeLocale
