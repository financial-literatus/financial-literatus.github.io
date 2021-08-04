import { ShowcaseAction } from "../actions/showcaseActions";
import { MajorsGraphArray } from "../types/majorsGraphArray";
import { GraphItemElement } from "../types/graphItemElement";

export interface ShowcaseState {
  filter_wage: number;
  label: string;
  average_wage: number;
  job_code: string;
  description: string;
  majors_array: MajorsGraphArray,
  skills_array: any, //Using correct type doesn't work with graph
  job_visibility: string
}

const initialState = {
    filter_wage: 0,
    label: "-",
    average_wage: 0,
    job_code: "0",
    description: "<h1>Loading...</h1>",
    majors_array: {
        name: "root",
        children: [
            {
                name: "No data provided",
                value: 404,
            },
        ]
    },
    skills_array: [
        { 
            name: "No data provided",  
            value: 404
        }
    ],
    job_visibility: "unloaded"
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const showcaseReducer = ( state: ShowcaseState = initialState, action: ShowcaseAction ) => {
    switch (action.type) {
        case "FILTER_WAGE":
            state.filter_wage = action.payload;
            return state;

        case "UPDATE_LABEL":
            state.label = action.payload;
            return state;

        case "UPDATE_WAGE":
            state.average_wage = action.payload;
            return state;

        case "UPDATE_DESCRIPTION":
            state.description = action.payload;
            return state;

        case "UPDATE_CODE":
            state.job_code = action.payload;
            return state;

        case "UPDATE_MAJORS_GRAPH":
            state.majors_array.children = action.payload;
            return state;

        case "UPDATE_SKILLS_GRAPH":
            state.skills_array = action.payload;
            return state;

        case "UPDATE_JOB_VISIBILITY":
            state.job_visibility = action.payload;
            return state;

        default:
            return state;
    }
};
