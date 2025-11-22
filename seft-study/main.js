let articleCount = 1;

const articleTitles = [
    "Understanding JavaScript Closures",
    "A Guide to Responsive Web Design",
    "Introduction to CSS Flexbox",
    "Getting Started with HTML5",
    "Building Interactive Web Pages with DOM Manipulation"
];

const articleContents = [
    "JavaScript closures are a fundamental concept that allows functions to access variables from an enclosing scope, even after that scope has closed.",
    "Responsive web design is an approach that ensures web pages render well on a variety of devices and window or screen sizes.",
    "CSS Flexbox is a layout model that allows for the arrangement of elements in a flexible and efficient manner, even when their size is unknown or dynamic.",
    "HTML5 is the latest version of the Hypertext Markup Language, which introduces new elements and attributes for better structuring web content.",
    "DOM manipulation involves using JavaScript to dynamically change the structure, style, and content of a web page after it has been loaded."
];      

function addNewArticle() {

    articleCount++;

    const randomTile = articleTitles[Math.floor(Math.random() * articleTitles.length)];
    const randomContent1 = articleContents[Math.floor(Math.random() * articleContents.length)];
    const randomContent2 = articleContents[Math.floor(Math.random() * articleContents.length)];

    const newArticle = document.createElement('article');
    newArticle.id = `article-${articleCount}`;
    newArticle.className = 'article';

    newArticle.innerHTML = `
        <h1>${randomTile}</h1>
        <p>${randomContent1}</p>
        <p>${randomContent2}</p>
    `;
    document.querySelector('main').appendChild(newArticle);

    

}