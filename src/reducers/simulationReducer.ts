import { Action } from "../actions/simulationActions";
import {SimulationActionsTypesEnum  as SimulationAction} from "../types/actions";
import {ISimulationState, IPieChartData} from "../types/simulationType";
import AssistantLogo from "../assets/icons/assistant.svg"
import { IKeyFieldData } from "../types/fieldData";

const InitFieldState:IKeyFieldData = {
    "expense": 0,
    "description": undefined,
} 

// get data from local storage for each category
const _job:string|undefined = localStorage.getItem("job") || undefined;
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
    job: _job,
    housing: _housingType,
    transportation: _transportationType,
    health: _healthType,
    mischellaneous: _mischellaneousData,

    InitialNivoPieChartDataArray: [
        InitialNivoPieChartData
    ],
    // NewNivoPieChartDataArray: new Array<IPieChartData>(),
    helperContent: {
        description: {
            message: "More information about each section of the form will appear here.",
            img: AssistantLogo
        }
    }
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

        case SimulationAction.SELECT_JOB:
            state.job = action.payload;
            return state;

        case SimulationAction.SELECT_COMMUTE_MODE:
            state.transportation.description = action.value;           
            return state;

        case SimulationAction.SELECT_HOUSING:
            state.housing.description = action.value;
            return state;

        case SimulationAction.SELECT_HEALTH:
            state.health.description = action.value;
            return state;

        case SimulationAction.SET_HOUSING_EXPENSE:
            state.housing.expense = action.payload;
            return state;
        
        case SimulationAction.SET_COMMUTE_EXPENSE:
            state.transportation.expense = action.payload;
            return state;
        
        case SimulationAction.SET_HEALTH_EXPENSE:
            state.health.expense = action.payload;
            return state;

        case SimulationAction.SET_MISCHELLANEOUS:
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
            state.job = undefined;
            state.housing.description= undefined;  
            state.transportation.description = undefined;
            state.health.description = undefined;

            state.transportation.expense = 0;
            state.health.expense = 0;
            state.housing.expense = 0;
            state.mischellaneous = [];

            state.helperContent = {
                description: {
                    message: "More information about each section of the form will appear here.",
                    img: AssistantLogo
                }
            }
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