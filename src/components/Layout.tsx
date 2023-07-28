import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";
import '../app.scss'
import AppDialog from "./AppDialog";
import SearchForm from "./SearchForm";
import { useState } from "react";

export default function Layout() {
    const [isSearchFormOpen, setIsSearchFormOpen] = useState(false);

    const openSearchDialog = () => setIsSearchFormOpen(true);
    const closeSearchDialog = () => setIsSearchFormOpen(false);

    return (
        <>
            <AppHeader openSearch={openSearchDialog} />

            <Outlet />

            <AppDialog isOpened={isSearchFormOpen} onClose={closeSearchDialog}>
                <SearchForm />
            </AppDialog>
        </>
    )
}
