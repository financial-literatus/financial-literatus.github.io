import { TypedUseSelectorHook, useSelector } from "react-redux";
import { combineReducers } from "redux";
//import { jobReducer } from "./showcaseReducer";
import { simulationReducer } from "./simulationReducer";
import { showcaseReducer } from "./showcaseReducer";
import { educationReducer } from "./educationReducer";
import { mainReducer } from "./mainReducer";



export const rootReducer = combineReducers({
  main: mainReducer,
  showcase: showcaseReducer,
  simulation: simulationReducer,
  education: educationReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default rootReducer;
