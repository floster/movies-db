import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";
import '../app.scss'
import AppSearchDialog from "./AppSearchDialog";
import SearchForm from "./SearchForm";
import { SearchDialogProvider } from "../contexts/SearchDialogContext";

export default function Layout() {
    return (
        <SearchDialogProvider>
            <AppHeader />

            <Outlet />

            <AppSearchDialog>
                <SearchForm />
            </AppSearchDialog>
        </SearchDialogProvider>
    )
}
