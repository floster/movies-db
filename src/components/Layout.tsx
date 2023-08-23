import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";
import '../app.scss'
import AppSearchDialog from "./AppSearchDialog";
import QuickSearchForm from "./QuickSearchForm";
import { SearchDialogProvider } from "../contexts/SearchDialogContext";
import { ChangeLocaleProvider } from "../contexts/ChangeLocaleContext";

export default function Layout() {
    return (
        <SearchDialogProvider>
            <ChangeLocaleProvider>
                <AppHeader />

                <Outlet />

                <AppSearchDialog>
                    <QuickSearchForm />
                </AppSearchDialog>
            </ChangeLocaleProvider>
        </SearchDialogProvider>
    )
}
