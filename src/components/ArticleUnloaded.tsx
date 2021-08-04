import ArticleLogo from "../assets/icons/article.svg"

/**
 * Unloaded article component.
 * Represents the left down part of the education when an article is not loaded.
 * 
 * @returns a page that represents description of the unloaded article as a JSX element.
 */
export function ArticleUnloaded(): JSX.Element {
  return (
    <div className="Unloaded-article-container">
        <h2 className="Unloaded-article-text">Select an article</h2>
        <img
            className="Unloaded-article-logo"
            src={ArticleLogo}
            alt="Unloaded article"
        ></img>
    </div>
  );
}
