// ********************** ACTIONS FOR EDUCATON ********************** //
export type EducationAction =
  | { type: "UPDATE_SELECTED_ARTICLE"; payload: number }
  |{type: "UPDATE_COMPLETED_ARTICLES"; payload: boolean[]}

export const selectArticle = (_payload: number): EducationAction => ({
  type: "UPDATE_SELECTED_ARTICLE",
  payload: _payload,
});

export const updateCompletedArticles = (_payload: boolean[]): EducationAction => ({
  type: "UPDATE_COMPLETED_ARTICLES",
  payload: _payload,
});

// ****************************************************************** //
