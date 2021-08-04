import { IHelperContentElement } from "./helperContentElement";

/**
 * Type for mischellaneous props
 */
export type MischellaneousProps = {
    "description": string;
    "expense": string;
    "isTouched": boolean
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
    job: string;
    housing: {
      "expense": number,
      "value": string,
    };
    transportation: {
      "expense": number,
      "value": string,
      "gasCost": number,
      "maintenance": number,
    };
    health: {
        "description": string,
        "expense": number, 
        "haveInsurance": boolean,
    }
    mischellaneous: Array<MischellaneousProps>;
    InitialNivoPieChartDataArray: Array<IPieChartData>;
    NewNivoPieChartDataArray?: Array<IPieChartData>;
    helperContent: IHelperContentElement;
}