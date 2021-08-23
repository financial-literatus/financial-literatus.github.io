import { IHelperContentElement } from "./helperContentElement";
import {IFormField} from "./fieldData";

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
    "job": IFormField;
    "housing": IFormField;
    "transportation": IFormField;
    "health": IFormField;
    "mischellaneous": Array<IFormField>;
    "InitialNivoPieChartDataArray": Array<IPieChartData>;
    "NewNivoPieChartDataArray"?: Array<IPieChartData>;
    "helperContent": IHelperContentElement;
}