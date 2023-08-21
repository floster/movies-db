import { FC, createContext, useContext, useReducer } from "react";

interface SearchDialogState { visible: boolean, show: () => void, hide: () => void }
const SearchDialogContext = createContext<SearchDialogState>({ visible: false, show: () => { }, hide: () => { } });
export const useSearchDialog = () => useContext(SearchDialogContext);

const SHOW_SEARCH_DIALOG = 'show';
const HIDE_SEARCH_DIALOG = 'hide';

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case SHOW_SEARCH_DIALOG: return { ...state, visible: true };
        case HIDE_SEARCH_DIALOG: return { ...state, visible: false };
        default: return state;
    }
}

type Props = {
    children: React.ReactNode;
}

export const SearchDialogProvider: FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, { visible: false });

    const show = () => dispatch({ type: SHOW_SEARCH_DIALOG });
    const hide = () => dispatch({ type: HIDE_SEARCH_DIALOG });

    return (
        <SearchDialogContext.Provider value={{
            visible: state.visible,
            show,
            hide
        }}>
            {children}
        </SearchDialogContext.Provider>
    )
};