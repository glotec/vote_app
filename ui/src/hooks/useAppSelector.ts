import { useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState } from "../app/store";

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// const { categories, loading, error } = useSelector(
//   (state: RootState) => state.categoriesReducer
// );
export const useClinicSelector = () =>
    useSelector((state: RootState) => state.clientsSlice);

export default useAppSelector;
