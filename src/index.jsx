import React from 'react';
import ReactDOM from 'react-dom/client';
import ArticlePreview from './js/article-preview.jsx';

// Styles
import './styles/style.scss';

const initLog = () => {
    console.log(`Tag ${VERSION}`);
    console.log(`Built on ${BUILT}`);
};

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.setAttribute('crossorigin', 'anonymous');
        script.setAttribute('referrerpolicy', 'no-referrer');
        script.onload = () => resolve(script);
        script.onerror = () =>
            reject(new Error(`Script load error for ${src}`));
        document.head.append(script);
    });
}

/**
 * Initialize the content
 */
function initContent() {
    // Remove the disabled attribute from all stylesheets
    Array.from(document.getElementsByClassName('disabledStylesheet')).forEach(
        (el) => {
            el.removeAttribute('disabled');
        }
    );
    // Remove the loading class from all elements
    Array.from(document.getElementsByClassName('loading')).forEach((el) => {
        el.classList.remove('loading');
    });
}

function dynamicContent() {
    ReactDOM.createRoot(document.getElementById('articles')).render(
        <ArticlePreview />
    );
}

window.onload = () => {
    initLog();
    initContent();
    dynamicContent();
};
