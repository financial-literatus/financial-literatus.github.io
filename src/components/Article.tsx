import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { useTypedSelector } from "../reducers";
import ArticleList from "../assets/ArticleList.json";
import { RealisticConfetti } from "./RealisticConfetti";
import { RealisticFinalConfetti } from "./RealisticFinalConfetti";

import { Button, message } from "antd";
import { updateCompletedArticles } from "../actions/educationActions";


/**
 * Article component. The left down part of the education page. 
 * Includes article's name (label), citation, link, complete button.
 * 
 * @returns a page that represents an article as JSX element.
 */
export function Article(): JSX.Element {
  const dispatch = useDispatch()

  // A variable to keep track of the selected article
  const selectedArticle = useTypedSelector((state) => state.education.article_selected)
  const completedArticles = useTypedSelector((state) => state.education.articles_completed)
  const articlesButtonsText = useTypedSelector((state) => state.education.articles_buttons_text)
  const markedArticles = useTypedSelector((state) => state.education.articles_marked)

  
  const Confetti = React.useRef<RealisticConfetti>(null);
  const FinalConfetti = React.useRef<RealisticFinalConfetti>(null);

  
  function toggleCompleted(){
    const allMarkedExceptOne = (completedArticles.length-2)/(ArticleList.length-1) * 100
    const tempArray: boolean[] = completedArticles;
    if (tempArray[selectedArticle] == false && markedArticles == allMarkedExceptOne) {
      FinalConfetti.current?.handlerClickStart()
      setTimeout(() => FinalConfetti.current?.handlerClickPause(), 2700);
      message.success("Education is completed! Congratulations!");
    }
    else if (tempArray[selectedArticle] == false)
      Confetti.current?.handlerFire()
    tempArray[selectedArticle] = !tempArray[selectedArticle];
    dispatch(updateCompletedArticles(tempArray))
  }

  
  return (<>
    <h2 className="Article-title">{ArticleList[selectedArticle].label}</h2>
    <blockquote 
      className="Article-text" 
      cite={ArticleList[selectedArticle].url} >
      <p>{ArticleList[selectedArticle].text}</p>
    </blockquote>
    <figcaption className = "Article-source">
     {ArticleList[selectedArticle].author}<cite>
        {ArticleList[selectedArticle].source}
      </cite>
    </figcaption>
    <div className = "Article-buttons">
      <Button type="link" href={ArticleList[selectedArticle].url} target="_blank">Read full article</Button>
      <Button type="link" onClick={toggleCompleted}>{articlesButtonsText[selectedArticle-1]} as completed</Button>
    </div>
    <RealisticConfetti ref={Confetti}/>
    <RealisticFinalConfetti ref={FinalConfetti}/>
  </>);
}
