
//https://beautifulinteractions.github.io/beautiful-react-diagrams/#/Getting%20started
import "beautiful-react-diagrams/styles.css";
//https://collapse-pane.zurg.dev/#/?id=react-collapse-pane
import { SplitPane } from "react-collapse-pane";
import { resizerOptions, resizerOptionsHorizontal } from "../assets/ResizerOptions";
import { Menu, Progress } from "antd";
import { UncontrolledDiagram } from "../components/Articles";
import { useDispatch } from "react-redux";
import { selectArticle } from "../actions/educationActions";
import { useTypedSelector } from "../reducers";
import ArticleList from "../assets/ArticleList.json";
import { Article } from "../components/Article"
import { ArticleUnloaded } from "../components/ArticleUnloaded"

import "../style/Education.css";

/**
 * Education page component.
 * 
 * @returns the enitre education page as a JSX.Element.
 */
export function Education(): JSX.Element {

  const dispatch = useDispatch()

  // A variable to keep track of the selected article
  const selectedArticle = useTypedSelector((state) => state.education.article_selected)
  const markedArticles = useTypedSelector((state) => state.education.articles_marked)
  
  function EducationLeftDown(){
    switch(selectedArticle) {

      case 0:  return <ArticleUnloaded/>

      default:  return <Article/>
    }
  }

  return (
    <div>
        <SplitPane
          split="vertical"
          initialSizes={[2, 5]}
          resizerOptions={resizerOptions}
        >
          <div className="Education-left">
              <div className="Education-progress">
                <Progress className="Education-progress-bar" 
                  strokeColor={{
                      "0": "#108ee9",
                      "100": "#87d068",
                    }}
                percent={markedArticles} status="active"
                format={(percent) => {if (percent === 100) { return "Done!" } else return percent?.toFixed(2) + "%"}}
                />
              </div>
              <div className="Education-left-up">
                <Menu mode="inline" theme="light" className="Articles-list" selectedKeys = {[selectedArticle.toString()]} >
                {ArticleList.map(function (article, i) {
                  if (i !== 0)
                    return <Menu.Item key={i} onClick={() => {dispatch(selectArticle(i))}}>Article {i}: {article.label}</Menu.Item>
                })}                  
                </Menu>
              </div>
              <div className="Education-left-down">
                { EducationLeftDown() }
              </div>  
          </div>
          <div className="Education-right">
            <UncontrolledDiagram/>
          </div>
        </SplitPane>
    </div>
  );
}