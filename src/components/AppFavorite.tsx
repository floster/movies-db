import { useState } from "react";
import SvgIcon from "./SvgIcon";

interface Props {
    checked: boolean;
    title: string;
}

export default function AppFavorite({ checked, title }: Props) {
    const [checkedState, setCheckedState] = useState(checked);
    const toggleCheckedState = () => setCheckedState(!checkedState);

    return (
        <>
            <label className="app-favorite" aria-label={`add ${title} to favorites`}>
                <input type="checkbox" name="toggleFavoriteCheckbox" id="" defaultChecked={checkedState} onChange={toggleCheckedState} />
                <SvgIcon icon="fire" extraClass="m-outline" />
                <SvgIcon icon="fire_solid" extraClass="m-solid" />
            </label>
        </>
    );
}
