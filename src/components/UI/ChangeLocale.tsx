import { useState } from 'react'
import { LOCALES } from '../../config/'
import { IAvalableLocales } from '../../types/tmdb.models'
import AppSelect from './SortSelect'

const ChangeLocale = () => {
  // TODO: #locale make it with Redux
  const [locale, setLocale] = useState(LOCALES[0].value)
  const changeLocale = (locale: IAvalableLocales) => setLocale(locale)

  return (
    <>
      <AppSelect
        options={LOCALES}
        currentOption={locale}
        optionChanged={locale => changeLocale(locale as IAvalableLocales)}
      />
    </>
  )
}

export default ChangeLocale
