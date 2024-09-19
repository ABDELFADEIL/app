// استخراج معرف المقال من الـ URL
urlParams = new URLSearchParams(window.location.search);
articleId = urlParams.get('id');  // معرف المقال الحالي

// جلب المقالات من ملف JSON
fetch('https://abdelfadeil.github.io/app/data/articles.json')
    .then(response => response.json())
    .then(data => {
        const articles = data.articles;
        console.log(articles);
        // البحث عن المقال بناءً على المعرف
        const currentArticle = articles.find(article => article.id == articleId);
        console.log(currentArticle);
        if (currentArticle) {
            // عرض تفاصيل المقال الحالي
            document.getElementById('article-title').textContent = currentArticle.title;
            document.getElementById('publish-date').textContent = `تاريخ النشر: ${currentArticle.date}`;
            document.getElementById('author-image').src = currentArticle.author.image;
            document.getElementById('author-name').textContent = currentArticle.author.name;
            document.getElementById('article-content').textContent = currentArticle.content;
        } else {
            console.error('مقال غير موجود');
        }

        // عرض الأخبار الأخرى (المقالات الأخرى) باستثناء المقال الحالي
        const otherArticlesContainer = document.getElementById('other-articles');
        articles.filter(article => article.id != articleId)  // استبعاد المقال الحالي
            .forEach(otherArticle => {
                const otherArticleDiv = document.createElement('div');
                otherArticleDiv.classList.add('other-article-item');

                const otherArticleImage = document.createElement('img');
                otherArticleImage.src = otherArticle.author.image;
                otherArticleImage.alt = otherArticle.title;
                otherArticleImage.classList.add('other-article-image');

                const otherArticleTitle = document.createElement('p');
                otherArticleTitle.classList.add('other-article-title');
                otherArticleTitle.textContent = otherArticle.title;

                const articleDetails = document.createElement('div');
                const otherArticleAuthor = document.createElement('p');
                otherArticleAuthor.classList.add('other-article-author-name');
                otherArticleAuthor.textContent = otherArticle.author.name;
                
                articleDetails.classList.add("article-item-content");


                otherArticleDiv.appendChild(otherArticleImage);
                articleDetails.appendChild(otherArticleTitle);
                articleDetails.appendChild(otherArticleAuthor);
                
                otherArticleDiv.appendChild(articleDetails);
                // عند النقر، الانتقال إلى صفحة تفاصيل المقال
                otherArticleDiv.addEventListener('click', () => {
                    window.location.href = `article-details.html?id=${otherArticle.id}`;
                });

                otherArticlesContainer.appendChild(otherArticleDiv);
            });
    })
    .catch(error => console.error('خطأ في جلب المقالات:', error));

