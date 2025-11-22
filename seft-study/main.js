
let articleCount = 1;


function goToContact() {
    window.location.href = 'contact.html';
}


function openModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('show');
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('show');
}

window.addEventListener('click', function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
});

window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});


function addNewArticle() {
    articleCount++;
    
    const newArticle = document.createElement('article');
    newArticle.id = 'article-' + articleCount;
    newArticle.className = 'article';
    
    newArticle.innerHTML = `
        <h2>New Article ${articleCount}</h2>
        <p>This is a new article with some placeholder text.</p>
        <p>More content for the new article.</p>
    `;
    
    const container = document.getElementById('articles-container');
    
    container.appendChild(newArticle);
    
    newArticle.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    console.log('New article added with ID: article-' + articleCount);
}