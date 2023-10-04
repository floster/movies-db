import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { tmdbActions } from "../store/tmdb/tmdb.slice";

const actions = {
  ...tmdbActions,
};

/**
 * A custom hook that wraps the `useDispatch` hook from `react-redux` and binds the action creators to the dispatch function.
 * @returns {Record<string, Function>} An object containing the bound action creators.
 */
export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
