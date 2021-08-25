import { Action } from "../actions/simulationActions";
import {SimulationActionsTypesEnum  as SimulationAction} from "../types/actions";
import {ISimulationState, IPieChartData} from "../types/simulationType";
import AssistantLogo from "../assets/icons/assistant.svg"
import { IFormField } from "../types/simulationtype";

const InitFieldState:IFormField = {
    "inputValue": 0,
    "description": undefined,
} 

const InitHelperState = {
    description: {
        message: "More information about each section of the form will appear here.",
        img: AssistantLogo
    }
}

// get data from local storage for each category
const _job: ISimulationState["job"] = JSON.parse(localStorage.getItem("simulation data") || JSON.stringify("{}"))["Occupation"];
const _housing: ISimulationState["housing"] = JSON.parse(localStorage.getItem("simulation data") || JSON.stringify("{}"))["Housing"];
const _commute: ISimulationState["transportation"] = JSON.parse(localStorage.getItem("simulation data") || JSON.stringify("{}"))["Transportation"];
const _health: ISimulationState["health"] = JSON.parse(localStorage.getItem("simulation data") || JSON.stringify("{}"))["Health"];
const _misc: ISimulationState["mischellaneous"] = JSON.parse(localStorage.getItem("simulation data") || JSON.stringify("{}"))["Mischellaneous"];

// initialize data for pie chart
 const InitialNivoPieChartData: IPieChartData = {
    id: "No data selected",
    value: 1,
    color: "#c4e5f9"
}

const INITIAL_STATE: ISimulationState = {
    job: _job,
    housing: _housing,
    transportation: _commute,
    health: _health,
    mischellaneous: _misc,

    InitialNivoPieChartDataArray: [
        InitialNivoPieChartData
    ],
    // NewNivoPieChartDataArray: new Array<IPieChartData>(),
    helperContent: InitHelperState
}

/**
 * This reducer stores and updates simulation state
 * 
 * @param state ISimulationState (current)
 * @param action Action
 * @returns ISimulationState (new)
 */
export const simulationReducer = (state: ISimulationState = INITIAL_STATE, action: Action): ISimulationState => {
    switch (action.type) {

        case SimulationAction.UPDATE_JOB:
            state.job = action.payload;
            return state;

        case SimulationAction.UPDATE_HOUSING:
            state.housing = action.payload;
            return state;

        case SimulationAction.UPDATE_TRANSPORTATION:
            state.transportation = action.payload;           
            return state;

        case SimulationAction.UPDATE_HEALTH:
            state.health = action.payload;
            return state;
    
        case SimulationAction.UPDATE_MISCHELLANEOUS:
            state.mischellaneous = action.payload;
            return state;

        case SimulationAction.LOAD_INITIAL_PIE_CHART:
            return state;

        case SimulationAction.UPDATE_PIE_CHART:
            state.NewNivoPieChartDataArray= action.payload;
            return state;
        
        case SimulationAction.UPDATE_CONTENT:
            state.helperContent = action.payload;
            return state;

        case SimulationAction.SAVE:
            localStorage.setItem("simulation data", JSON.stringify(action.payload));
            return state;
        
        case SimulationAction.CLEAR:
            localStorage.clear();
            state.job = InitFieldState;
            state.housing= InitFieldState;  
            state.transportation= InitFieldState;
            state.health= InitFieldState;
            state.mischellaneous = [];
            state.helperContent = InitHelperState;
            return state;

        case SimulationAction.LOAD_FROM_LOCAL_STORAGE:
            state.job = JSON.parse(localStorage.getItem("simulation data") || JSON.stringify("{}"))["Occupation"];            
            state.housing = JSON.parse(localStorage.getItem("simulation data") || JSON.stringify("{}"))["Housing"];
            state.transportation = JSON.parse(localStorage.getItem("simulation data") || JSON.stringify("{}"))["Transportation"];
            state.health = JSON.parse(localStorage.getItem("simulation data") || JSON.stringify("{}"))["Health"];
            state.mischellaneous = JSON.parse(localStorage.getItem("simulation data") || JSON.stringify("{}"))["Mischellaneous"];
            return state;

        default:
            return state;
    }
};