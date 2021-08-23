import { Action } from "../actions/simulationActions";
import {SimulationActionsTypesEnum  as SimulationAction} from "../types/actions";
import {ISimulationState, IPieChartData} from "../types/simulationType";
import AssistantLogo from "../assets/icons/assistant.svg"
import { IFormField } from "../types/fieldData";

const InitFieldState:IFormField = {
    "expense": 0,
    "description": undefined,
} 

const InitHelperState = {
    description: {
        message: "More information about each section of the form will appear here.",
        img: AssistantLogo
    }
}

// get data from local storage for each category
const _jobType: ISimulationState["job"] = JSON.parse(localStorage.getItem("job") || JSON.stringify(InitFieldState)) as ISimulationState["job"];
const _housingType:ISimulationState["housing"] = JSON.parse(localStorage.getItem("housing") || JSON.stringify(InitFieldState)) as ISimulationState["housing"];
const _transportationType:ISimulationState["transportation"] = JSON.parse(localStorage.getItem("transportation") || JSON.stringify(InitFieldState)) as ISimulationState["transportation"];
const _healthType: ISimulationState["health"] = JSON.parse(localStorage.getItem("health") || JSON.stringify(InitFieldState)) as ISimulationState["health"];
const _mischellaneousData:ISimulationState["mischellaneous"] = JSON.parse("[]" || localStorage.getItem("mischellaneous")) as ISimulationState["mischellaneous"];

// initialize data for pie chart
 const InitialNivoPieChartData: IPieChartData = {
    id: "No data selected",
    value: 1,
    color: "#c4e5f9"
}

const INITIAL_STATE: ISimulationState = {
    job: _jobType,
    housing: _housingType,
    transportation: _transportationType,
    health: _healthType,
    mischellaneous: _mischellaneousData,

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
            localStorage.setItem("job", JSON.stringify(state.job));
            localStorage.setItem("housing", JSON.stringify(state.housing));
            localStorage.setItem("transportation", JSON.stringify(state.transportation));
            localStorage.setItem("health", JSON.stringify(state.health));
            localStorage.setItem("mischellaneous", JSON.stringify(state.mischellaneous));
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
            state.job = JSON.parse(localStorage.getItem("job") || "") as ISimulationState["job"];            state.housing = JSON.parse(localStorage.getItem("housing") || "{}") as ISimulationState["housing"];
            state.transportation = JSON.parse(localStorage.getItem("transportation") || "{}") as ISimulationState["transportation"];
            state.health = JSON.parse(localStorage.getItem("health") || "{}") as ISimulationState["health"];
            state.mischellaneous = JSON.parse(localStorage.getItem("mischellaneous") || "[null]") as ISimulationState["mischellaneous"];
            return state;

        default:
            return state;
    }
};