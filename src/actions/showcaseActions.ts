import { GraphItemElement } from "../types/graphItemElement";

// ********************** ACTIONS FOR SHOWCASE ********************** //
export type ShowcaseAction =
  | { type: "UPDATE_LABEL"; payload: string }
  | { type: "UPDATE_WAGE"; payload: number }
  | { type: "FILTER_WAGE"; payload: number }
  | { type: "UPDATE_DESCRIPTION"; payload: string }
  | { type: "UPDATE_CODE"; payload: string }
  | { type: "UPDATE_MAJORS_GRAPH"; payload: Array<GraphItemElement> }
  | { type: "UPDATE_SKILLS_GRAPH"; payload: Array<GraphItemElement> }
  | { type: "UPDATE_JOB_VISIBILITY"; payload: string }




export const filterWage = (_payload: number): ShowcaseAction => ({
  type: "FILTER_WAGE",
  payload: _payload,
});

export const updateLabel = (_payload: string): ShowcaseAction => ({
  type: "UPDATE_LABEL",
  payload: _payload,
});

export const updateWage = (_payload: number): ShowcaseAction => ({
  type: "UPDATE_WAGE",
  payload: _payload,
});

export const updateDescription = (_payload: string): ShowcaseAction => ({
  type: "UPDATE_DESCRIPTION",
  payload: _payload,
});

export const updateCode = (_payload: string): ShowcaseAction => ({
  type: "UPDATE_CODE",
  payload: _payload,
});

export const updateMajorsGraph = (_payload: Array<GraphItemElement>): ShowcaseAction => ({
  type: "UPDATE_MAJORS_GRAPH",
  payload: _payload,
});

export const updateSkillsGraph= (_payload: Array<GraphItemElement>): ShowcaseAction => ({
  type: "UPDATE_SKILLS_GRAPH",
  payload: _payload,
});

export const updateJobVisibility= (_payload: string): ShowcaseAction => ({
  type: "UPDATE_JOB_VISIBILITY",
  payload: _payload,
});
// ****************************************************************** //
