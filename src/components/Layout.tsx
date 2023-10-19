import { Outlet } from 'react-router-dom'
import AppHeader from './AppHeader'
import '../app.scss'
import AppDialog from './AppDialog'
import QuickSearchForm from './QuickSearch/QuickSearchForm'

export default function Layout() {
  return (
    <>
      <AppHeader />

      <Outlet />

      <AppDialog>
        <QuickSearchForm />
      </AppDialog>
    </>
  )
}
