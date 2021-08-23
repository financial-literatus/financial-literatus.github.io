import {IPieChartData} from "../types/simulationType";
import {SimulationActionsTypesEnum  as SimulationAction} from "../types/actions";
import { IHelperContentElement } from "../types/helperContentElement";
import { IFormField } from "../types/fieldData";

// ********************* ACTIONS FOR FORM ********************* //
export type Action =
  | { type: SimulationAction.UPDATE_JOB; payload: IFormField }
  | { type: SimulationAction.UPDATE_HOUSING; payload: IFormField}
  | { type: SimulationAction.UPDATE_TRANSPORTATION, payload: IFormField}
  | { type: SimulationAction.UPDATE_HEALTH, payload: IFormField}
  | { type: SimulationAction.UPDATE_MISCHELLANEOUS, payload: Array<IFormField>}
  | { type: SimulationAction.CLEAR }
  | { type: SimulationAction.SAVE }
  | { type: SimulationAction.LOAD_INITIAL_PIE_CHART}
  | { type: SimulationAction.UPDATE_PIE_CHART, payload: Array<IPieChartData>}
  | { type: SimulationAction.UPDATE_CONTENT, payload: IHelperContentElement}
  | { type: SimulationAction.LOAD_FROM_LOCAL_STORAGE};


export const updateJob = (_payload: IFormField): Action => ({
  type: SimulationAction.UPDATE_JOB,
  payload: _payload,
});

export const updateHousing = (_payload: IFormField): Action => ({
  type: SimulationAction.UPDATE_HOUSING,
  payload: _payload,
});

export const updateTransportation = (_payload: IFormField): Action => ({
  type: SimulationAction.UPDATE_TRANSPORTATION,
  payload: _payload,
});

export const updateHealth = (_payload: IFormField): Action => ({
  type: SimulationAction.UPDATE_HEALTH,
  payload: _payload
})

export const updateMischellaneous = (
  _payload: Array<IFormField>
): Action => ({
  type: SimulationAction.UPDATE_MISCHELLANEOUS,
  payload: _payload,
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
