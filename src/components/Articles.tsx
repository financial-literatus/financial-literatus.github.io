import Diagram, { createSchema, useSchema } from "beautiful-react-diagrams";
import React from "react";
import { useDispatch } from "react-redux";
import { selectArticle } from "../actions/educationActions";
import { useTypedSelector } from "../reducers";
import ArticleList from "../assets/ArticleList.json";

import CompletedLogo from "../assets/icons/checklist.svg"

// Custome Node
function Article ( _props:{ content?: React.ReactNode } ): JSX.Element {
    const dispatch = useDispatch()

    const completedArticles = useTypedSelector((state) => state.education.articles_completed)
    const selectedArticle = useTypedSelector((state) => state.education.article_selected)

    const str: string = _props.content as unknown as string
    const id = parseInt(str)

    const currentCompleted = useTypedSelector((state) => state.education.articles_completed[id])

    const completed = completedArticles[id]

    function imageHolder(){
      switch(currentCompleted) {
        case true:  return( 
        <img
          style={{visibility: "visible" }}
            className="Completed-logo"
            src={CompletedLogo}
            alt="Completed logo"
         ></img>   )
  
        default:  return (
        <img
          style={{visibility: "visible" }}
          className="UNCompleted-logo"
          src={CompletedLogo}
          alt="Uncompleted logo"
       ></img>)
      }
    }

    return (
      <div className="CustomNode" onClick={() => {dispatch(selectArticle(id))}} style={
        {border: (!completed) ? 
            ((selectedArticle == id) ? "2px solid #198efb" : "1px solid black") :
            ((selectedArticle == id) ? "2px solid #198efb" : "2px solid #6cc186")}}>
        <h4 className="Node-text">{ArticleList[id].label} </h4> 
          <div>{imageHolder()}</div>
      </div>
    );
  }

  const initialSchema = createSchema({
    nodes: [
      { id: "fin_lit_1", content: "1", render: Article, coordinates: [50, 50],},
      { id: "budgeting_2", content: "2", render: Article, coordinates: [300, 50] },
      { id: "howtosave_3", content: "3", render: Article, coordinates: [500, 50] },
      { id: "bud_apps_4", content: "4", render: Article, coordinates: [350, 150] },
      { id: "save_vs_invest_5", content: "5", render: Article, coordinates: [750, 50] },
      { id: "invest_6", content: "6", render: Article, coordinates: [775, 200] },
      { id: "stocks_7", content: "7", render: Article, coordinates: [925, 310] },
      { id: "real_estate_8", content: "8", render: Article, coordinates: [650, 310] },
      { id: "risk_9", content: "9", render: Article, coordinates: [798, 400] },
      { id: "diversification_10", content: "10", render: Article, coordinates: [767, 550] },
      { id: "pesonal_finance_11", content: "11", render: Article, coordinates: [25, 200] },
      { id: "credit_score_12", content: "12", render: Article, coordinates: [70, 360] },
      { id: "retirement_13", content: "13", render: Article, coordinates: [330, 360] },
      { id: "IRA_14", content: "14", render: Article, coordinates: [100, 550] },
      { id: "401k_15", content: "15", render: Article, coordinates: [530, 550] },

    ],
    links: [
      { input: "fin_lit_1", output: "budgeting_2" },
      { input: "budgeting_2", output: "howtosave_3" },
      { input: "howtosave_3", output: "bud_apps_4" },
      { input: "howtosave_3", output: "save_vs_invest_5" },
      { input: "save_vs_invest_5", output: "invest_6" },
      { input: "invest_6", output: "stocks_7" },
      { input: "invest_6", output: "real_estate_8" },
      { input: "invest_6", output: "risk_9" },
      { input: "risk_9", output: "diversification_10" },
      { input: "fin_lit_1", output: "pesonal_finance_11" },
      { input: "pesonal_finance_11", output: "credit_score_12" },
      { input: "pesonal_finance_11", output: "retirement_13" },
      { input: "retirement_13", output: "IRA_14" },
      { input: "retirement_13", output: "401k_15" },
    ],
  });
  
export function UncontrolledDiagram(): JSX.Element {
    // create diagrams schema
    const [schema, { onChange }] = useSchema(initialSchema);
    return (
      <div className="Diagram" style={{ height: "110vh", width:"10wh"}}>
        <Diagram schema={schema} onChange={onChange}/>
      </div>
    );
  }