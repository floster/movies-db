import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";
import '../app.scss'
import AppDialog from "./AppDialog";
import QuickSearchForm from "./QuickSearchForm";
import { SearchDialogProvider } from "../contexts/SearchDialogContext";
import { ChangeLocaleProvider } from "../contexts/ChangeLocaleContext";
import { FavoritesProvider } from '../contexts/FavoritesContext'

export default function Layout() {
    return (
        <SearchDialogProvider>
            <ChangeLocaleProvider>
                <FavoritesProvider>
                    <AppHeader />

                    <Outlet />

                    <AppDialog>
                        <QuickSearchForm />
                    </AppDialog>
                </FavoritesProvider>
            </ChangeLocaleProvider>
        </SearchDialogProvider>
    )
}
