import { EducationAction } from "../actions/educationActions";
import ArticleList from "../assets/ArticleList.json"

export interface EducationState {
  article_selected: number;
  articles_completed: boolean[];
  articles_marked: number;
  articles_buttons_text: string[]
}

const _articlesCompletedInit = 
"[false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]"
const _articlesCompleted: boolean[] = JSON.parse(localStorage.getItem("articles_completed")|| _articlesCompletedInit)
const _articlesMarked: number = _articlesCompleted.filter(article => article === true).length/(ArticleList.length-1) * 100
const _articlesButtonsText: string[] = 
["Mark", "Mark", "Mark", "Mark", "Mark", "Mark", "Mark", "Mark", "Mark", "Mark", "Mark", "Mark", "Mark", "Mark", "Mark"]

_articlesCompleted.map((article, i) => {
    if (i !== 0){
        if (article === true)
            _articlesButtonsText[i-1] = "Unmark"
        if (article === false)
            _articlesButtonsText[i-1] = "Mark"
    }
})

const initialState = {
    article_selected: 0,
    articles_completed: _articlesCompleted,
    articles_marked: _articlesMarked,
    articles_buttons_text: _articlesButtonsText
};

export const educationReducer = ( state: EducationState = initialState, action: EducationAction ) => {
    switch (action.type) {
        case "UPDATE_SELECTED_ARTICLE":
            state.article_selected = action.payload;
            return state;

        case "UPDATE_COMPLETED_ARTICLES":
            state.articles_completed = action.payload;
            localStorage.setItem("articles_completed", JSON.stringify(state.articles_completed));
            state.articles_marked = state.articles_completed.filter(article => article === true).length/(ArticleList.length-1) * 100
            state.articles_completed.map((article, i) => {
                if (i !== 0){
                    if (article === true)
                        state.articles_buttons_text[i-1] = "Unmark"
                    if (article === false)
                        state.articles_buttons_text[i-1] = "Mark"
                }
            })
            return state;

        default:
            return state;
    }
};