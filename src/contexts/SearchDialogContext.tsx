import { FC, createContext, useContext, useState } from "react";

const SearchDialogContext = createContext({ visible: false, toggle: () => { } });

export const useSearchDialog = () => useContext(SearchDialogContext);

type Props = {
    children: React.ReactNode;
}

export const SearchDialogProvider: FC<Props> = ({ children }) => {
    const [searchDialog, setSearchDialog] = useState(false);

    const toggle = () => setSearchDialog(prev => !prev);

    return (
        <SearchDialogContext.Provider value={{
            visible: searchDialog,
            toggle
        }}>
            {children}
        </SearchDialogContext.Provider>
    )
};