import React from 'react';
// Exports a basic article preview component in react

const ARTICLES = require('./data/articles.js');

const SEARCH_URLS = {
    google: 'https://www.google.com/search?q=',
    backle: 'http://www.blackle.com/results/?q=',
    // ...
};

function renderArticle({ index, title, summary, image, link }) {
    return (
        <div className="article-preview" key={index}>
            <div className="article-preview-image">
                <img src={image} alt={title} />
            </div>
            <div className="article-preview-content">
                <h3 className="article-preview-title">{title}</h3>
                <p className="article-preview-summary">
                    {summary}
                    <span> </span>
                    <a
                        className="article-preview-link"
                        href={SEARCH_URLS.google + link}
                        aria-label="Open a search on the topic"
                        title="Read more about the topic on google"
                        target="_blank"
                    >
                        Read More...
                    </a>
                </p>
            </div>
        </div>
    );
}

const PAGE_SIZE = 4;

export default class ArticlePreview extends React.Component {
    constructor(props) {
        super(props);
        this.articles = [];
        this.currentPageIndex = 0;
    }

    nextPage() {
        this.currentPageIndex = Math.min(
            Math.floor(ARTICLES.length / PAGE_SIZE),
            this.currentPageIndex + 1
        );
        // scroll to top
        window.scrollTo(0, 0);
        this.forceUpdate();
    }

    prevPage() {
        this.currentPageIndex = Math.max(0, this.currentPageIndex - 1);
        // scroll to top
        window.scrollTo(0, 0);
        this.forceUpdate();
    }

    goTo(pageIndex) {
        this.currentPageIndex = pageIndex;
        // scroll to top
        window.scrollTo(0, 0);
        this.forceUpdate();
    }

    renderArticleList() {
        const offset = PAGE_SIZE * this.currentPageIndex;
        const currentPage = ARTICLES.slice(
            PAGE_SIZE * this.currentPageIndex,
            offset + PAGE_SIZE
        );
        return currentPage.map((article, index) =>
            renderArticle({
                index,
                ...article,
            })
        );
    }

    render() {
        return (
            <>
                <div className="article-preview-list">
                    {this.renderArticleList()}
                </div>
                <div className="article-page-controls">
                    <button onClick={() => this.prevPage()}>
                        <i className="fas fa-chevron-left" />
                    </button>
                    {(() => {
                        const rows = [];
                        for (
                            let i = 0;
                            i < Math.ceil(ARTICLES.length / PAGE_SIZE);
                            i++
                        ) {
                            rows.push(
                                <button
                                    // Heighlight the current page
                                    className={
                                        i === this.currentPageIndex
                                            ? 'active'
                                            : ''
                                    }
                                    onClick={() => this.goTo(i)}
                                >
                                    {i + 1}
                                </button>
                            );
                        }
                        return rows;
                    })()}
                    <button onClick={() => this.nextPage()}>
                        <i className="fas fa-chevron-right" />
                    </button>
                </div>
            </>
        );
    }
}
