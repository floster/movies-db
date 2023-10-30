import { Outlet } from 'react-router-dom'

import '../../app.scss'

import AppDialog from '../Dialog'
import AppHeader from '../AppHeader'
import QuickSearchForm from '../QuickSearch/QuickSearchForm'
import AppFooter from '../AppFooter'

const AppLayout: React.FC = () => (
  <>
    <AppHeader />

    <Outlet />

    <AppDialog>
      <QuickSearchForm />
    </AppDialog>
    <AppFooter />
  </>
)

export default AppLayout
