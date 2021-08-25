import { IHelperContentElement } from "./helperContentElement";

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

/**
 * Form Interface
 */
export interface IFormItemProps {
  name: string,
  inputValue: number,
  handleChange: any
}

/**
 * Form Field Interface
 */
export interface IFormField {
  "inputValue": number,
  "description": string | undefined,
};