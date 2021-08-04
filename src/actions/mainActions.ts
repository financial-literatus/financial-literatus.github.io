// ********************** ACTIONS FOR EDUCATON ********************** //
export type MainActions =
  | { type: "TOGGLE_SETTINGS"; payload: boolean }
  | { type: "TOGGLE_WELCOME"; payload: boolean };

export const toggleSettingsVisibility = (_payload: boolean): MainActions => ({
  type: "TOGGLE_SETTINGS",
  payload: _payload,
});

export const toggleWelcomeVisibility = (_payload: boolean): MainActions => ({
  type: "TOGGLE_WELCOME",
  payload: _payload,
});

// ****************************************************************** //
