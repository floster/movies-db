import { LOCALES } from '../../config'
import { useAppActions, useAppSelector } from '../../hooks/useRedux'
import { Locales } from '../../types/tmdb.models'
import Select from '../UI/Select/Select'

const LocaleBtn = () => {
  const locale = useAppSelector(state => state.locale.current)
  const { setLocale } = useAppActions()

  const handleLocaleChange = (locale: Locales) => {
    setLocale(locale)
  }

  return (
    <Select
      options={LOCALES}
      defaultValue={locale}
      onChange={locale => handleLocaleChange(locale)}
      extraClass="m-locale"
    />
  )
}

export default LocaleBtn
