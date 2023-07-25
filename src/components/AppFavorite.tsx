import { useState } from "react";
import AppAlert from "./AppAlert";
import SvgIcon from "./SvgIcon";

interface AppFavoriteProps {
    checked: boolean;
    title: string;
}

export const AppFavorite = ({ checked, title }: AppFavoriteProps) => {
    const [alertVisible, setAlertVisible] = useState(false);
    const [checkedState, setCheckedState] = useState(checked);
    const toggleCheckedState = () => setCheckedState(!checkedState);

    const showAlert = () => setAlertVisible(true);
    const hideAlert = () => setAlertVisible(false);

    const favoriteAction = checkedState ? 'added to' : 'removed from';

    return (
        <>
            <label className="app-favorite" aria-label={`add ${title} to favorites`} onClick={showAlert}>
                <input type="checkbox" name="toggleFavoriteCheckbox" id="" defaultChecked={checkedState} onChange={toggleCheckedState} />
                <SvgIcon icon="fire" extraClass="m-outline" />
                <SvgIcon icon="fire_solid" extraClass="m-solid" />
            </label>
            <AppAlert isOpened={alertVisible} onClose={hideAlert} text={title} action={favoriteAction} />
        </>
    );
};
