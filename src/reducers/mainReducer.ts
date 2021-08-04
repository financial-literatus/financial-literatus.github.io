import { MainActions } from "../actions/mainActions";

export interface MainState {
  settings_open: boolean;
  welcome_page_open: boolean;
}

const initialState = {
    settings_open: false,
    welcome_page_open: true,
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const mainReducer = ( state: MainState = initialState, action: MainActions ) => {
    switch (action.type) {
        case "TOGGLE_SETTINGS":
            state.settings_open = action.payload;
            return state;

        case "TOGGLE_WELCOME":
            state.welcome_page_open = action.payload;
            return state;

        default:
            return state;
    }
};
