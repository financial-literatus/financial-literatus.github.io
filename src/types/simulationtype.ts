import { IHelperContentElement } from "./helperContentElement";
import {IKeyFieldData} from "./fieldData";
/**
 * Type for mischellaneous props
 */
export type MischellaneousProps = {
    "description": string;
    "expense": string;
  };

/**
 * Pie Chart Data Interface
 */
 export interface IPieChartData {
  id: string;
  value: number;
  color: string;
}

/**
 * Simulation Interface
 */
export interface ISimulationState {
    job: string | undefined;
    housing: IKeyFieldData;
    transportation: IKeyFieldData;
    health: IKeyFieldData;
    mischellaneous: Array<IKeyFieldData>;
    InitialNivoPieChartDataArray: Array<IPieChartData>;
    NewNivoPieChartDataArray?: Array<IPieChartData>;
    helperContent: IHelperContentElement;
}