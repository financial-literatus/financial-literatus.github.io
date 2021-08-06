import {IPieChartData} from "../types/simulationType";
import {SimulationActionsTypesEnum  as SimulationAction} from "../types/actions";
import { IHelperContentElement } from "../types/helperContentElement";
import { IKeyFieldData } from "../types/fieldData";

// ********************* ACTIONS FOR FORM ********************* //
export type Action =
  | { type: SimulationAction.SELECT_JOB; payload: string }
  | { type: SimulationAction.SELECT_HOUSING; value: string}
  | { type: SimulationAction.SELECT_COMMUTE_MODE, value: string}
  | { type: SimulationAction.SELECT_HEALTH, value: string}
  | { type: SimulationAction.SET_HOUSING_EXPENSE, payload: number}
  | { type: SimulationAction.SET_COMMUTE_EXPENSE, payload: number}
  | { type: SimulationAction.SET_GAS_EXPENSE, payload: number}
  | { type: SimulationAction.SET_MAINTENANCE, payload: number}
  | { type: SimulationAction.SET_HEALTH_EXPENSE, payload: number}
  | { type: SimulationAction.SET_MISCHELLANEOUS, payload: Array<IKeyFieldData>}
  | { type: SimulationAction.SET_YES_OR_NO}
  | { type: SimulationAction.CLEAR }
  | { type: SimulationAction.SAVE }
  | { type: SimulationAction.LOAD_INITIAL_PIE_CHART}
  | { type: SimulationAction.UPDATE_PIE_CHART, payload: Array<IPieChartData>}
  | { type: SimulationAction.UPDATE_CONTENT, payload: IHelperContentElement}
  | { type: SimulationAction.LOAD_FROM_LOCAL_STORAGE};



export const selectJob = (_payload: string): Action => ({
  type: SimulationAction.SELECT_JOB,
  payload: _payload,
});

export const selectHousing = (_value: string): Action => ({
  type: SimulationAction.SELECT_HOUSING,
  value: _value,
});

export const selectCommuteMode = (_value: string): Action => ({
  type: SimulationAction.SELECT_COMMUTE_MODE,
  value: _value,
});

export const selectHealth = (_payload: string): Action => ({
  type: SimulationAction.SELECT_HEALTH,
  value: _payload
})

export const setHousingExpense = (_payload: number): Action => ({
  type: SimulationAction.SET_HOUSING_EXPENSE,
  payload: _payload,
});

export const setCommuteExpense = (_payload: number): Action => ({
  type: SimulationAction.SET_COMMUTE_EXPENSE,
  payload: _payload,
});

export const setGasCost = (_payload: number): Action => ({
  type: SimulationAction.SET_GAS_EXPENSE,
  payload: _payload,
});

export const setMaintenance = (_payload: number): Action => ({
  type: SimulationAction.SET_MAINTENANCE,
  payload: _payload,
});

export const setHealthExpense = (_payload: number): Action => ({
  type: SimulationAction.SET_HEALTH_EXPENSE,
  payload: _payload,
});

export const setMischellaneous = (
  _payload: Array<IKeyFieldData>
): Action => ({
  type: SimulationAction.SET_MISCHELLANEOUS,
  payload: _payload,
});

export const setYesOrNo = () : Action => ({
  type: SimulationAction.SET_YES_OR_NO,
});

export const loadInitialPieChart = (): Action => ({
  type: SimulationAction.LOAD_INITIAL_PIE_CHART
});

export const updatePieChart = (_payload: Array<IPieChartData>): Action => ({
  type: SimulationAction.UPDATE_PIE_CHART,
  payload: _payload
})

export const updateHelperContent = (_payload: IHelperContentElement): Action => ({
  type: SimulationAction.UPDATE_CONTENT,
  payload: _payload
})

export const loadFromLocalStorage = (): Action => ({
  type: SimulationAction.LOAD_FROM_LOCAL_STORAGE
});


export const clear = (): Action => ({
  type: SimulationAction.CLEAR,
});

export const save = (): Action => ({
  type: SimulationAction.SAVE,
})
// ****************************************************************** //
