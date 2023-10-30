import { useLocalStorage } from 'usehooks-ts'
import { LOCALES } from '../../config'
import { useAppActions } from '../../hooks/useRedux'
import { IAvalableLocales } from '../../types/tmdb.models'
import Select from '../UI/Select/Select'

export const LOCALE_LOCAL_STORAGE_KEY = 'tmdb-locale'

const LocaleBtn = () => {
  const [lsLocale, setLsLocale] = useLocalStorage(
    LOCALE_LOCAL_STORAGE_KEY,
    LOCALES[0].value
  )

  const { setLocale } = useAppActions()

  const handleLocaleChange = (locale: IAvalableLocales) => {
    setLsLocale(locale)
    setLocale(locale)
  }

  return (
    <Select
      options={LOCALES}
      defaultValue={lsLocale}
      onChange={locale => handleLocaleChange(locale)}
    />
  )
}

export default LocaleBtn
