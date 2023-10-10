import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../store/store";

/**
 * A custom hook that wraps the `useSelector` hook from `react-redux` and is used to type the `RootState`.
 * @template TState The type of the state held by the Redux store.
 * @template TSelected The type of the value returned by the selector function.
 * @param {(state: TState) => TSelected} selector A function that takes the Redux state and returns the selected state.
 * @returns {TSelected} The selected state.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
