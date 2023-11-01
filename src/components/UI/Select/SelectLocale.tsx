import { LOCALES } from '../../../config'
import { useAppActions, useAppSelector } from '../../../hooks/useRedux'
import { ELocales } from '../../../types/tmdb.models'
import AppSelect from './AppSelect'

const LocaleBtn = () => {
  const locale = useAppSelector(state => state.locale.current)
  const { setLocale } = useAppActions()

  const handleLocaleChange = (locale: ELocales) => {
    setLocale(locale)
  }

  return (
    <AppSelect<ELocales>
      options={LOCALES}
      defaultValue={locale}
      onChange={locale => handleLocaleChange(locale)}
      extraClass="m-locale"
    />
  )
}

export default LocaleBtn
