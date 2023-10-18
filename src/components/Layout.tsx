import { Outlet } from 'react-router-dom'
import AppHeader from './AppHeader'
import '../app.scss'
import AppDialog from './AppDialog'
import QuickSearchForm from './QuickSearch/QuickSearchForm'
import { SearchDialogProvider } from '../contexts/SearchDialogContext'

export default function Layout() {
  return (
    <SearchDialogProvider>
      <AppHeader />

      <Outlet />

      <AppDialog>
        <QuickSearchForm />
      </AppDialog>
    </SearchDialogProvider>
  )
}
