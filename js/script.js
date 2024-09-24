
// دالة تستخدم البيانات بعد تحميلها
async function useData() {
    try {
        // انتظار تحميل البيانات
        const { news, articles } = await dataPromise;

        // الآن يمكنك استخدام البيانات
        console.log("الأخبار:", news);
        console.log("المقالات:", articles);

        // تنفيذ كود إضافي باستخدام البيانات
    } catch (error) {
        console.error("Failed to load data:", error);
    }
}

// استخدام then و catch للتعامل مع الـ Promise
useData();
// استدعاء الدالة وتحميل البيانات عند تحميل الصفحة
window.onload = function () {
        if (articles && news) {
            showLoadedNews(news);
            showLoadedArticles(articles);
        }
};

function navigateToPage(pageUrl) {
    console.log(pageUrl);
    window.location.href = pageUrl;
}




// استخدام المعرف لجلب المحتوى المناسب بناءً على معرف المقال
// يمكنك الآن عرض تفاصيل المقال بناءً على المعرف


function creatArticleHtmlElement(article) {
    const articleItem = document.createElement('article');
    articleItem.classList.add('article-item');
    articleItem.setAttribute('data-article-id', article.id);

    // إضافة الصورة المصغرة
    const articleThumbnail = document.createElement('img');
    articleThumbnail.src = article.author.image;
    articleThumbnail.alt = article.title;
    articleThumbnail.classList.add('article-thumbnail');

    // إضافة محتوى المقال
    const articleContent = document.createElement('div');
    articleContent.classList.add('article-item-content');

    const articleTitle = document.createElement('h3');
    articleTitle.textContent = article.title;
    articleContent.appendChild(articleTitle);

    const articleAuthorName = document.createElement('p');
    articleAuthorName.textContent = article.author.name;
    articleContent.appendChild(articleAuthorName);
    articleItem.classList.add('article-item-home-page');
    // }
    //

    // تجميع العناصر
    articleItem.appendChild(articleThumbnail);
    articleItem.appendChild(articleContent);
    return articleItem;
}

function showLoadedArticles(articles) {
    const articlesContainer = document.getElementById('articles-section');

    // إنشاء العناصر الخاصة بالمقالات
    articles.forEach(article => {
        const articleItem = creatArticleHtmlElement(article);

        // إضافة المقال إلى الحاوية
        articlesContainer.appendChild(articleItem);
        // الحصول على جميع العناصر التي تحتوي على المقالات
        const articleItems = document.querySelectorAll('.article-item-home-page');
        // إضافة مستمع للنقر على كل عنصر article-item
        articleItems.forEach(item => {
            item.addEventListener('click', function () {
                // استخراج معرف المقال من data-article-id
                const articleId = item.getAttribute('data-article-id');
                // نقل الزائر إلى صفحة المقال بناءً على معرف المقال
                window.location.href = `pages/article-details.html?id=${articleId}`;
            });
        });
    });
}


function showLoadedNews(news) {
    const newsCarousel = document.getElementById('news-carousel');

    // إنشاء العناصر الخاصة بالأخبار
    news.forEach(newsItem => {
        // إنشاء العنصر news-item
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('news-item');
        newsDiv.setAttribute('data-news-id', newsItem.id);

        // إضافة صورة الخبر
        const newsImage = document.createElement('img');
        newsImage.src = newsItem.image;
        newsImage.alt = newsItem.headline;
        newsImage.classList.add('news-image');

        // إنشاء محتوى الخبر
        const newsContent = document.createElement('div');
        newsContent.classList.add('news-item-content');

        const newsTitle = document.createElement('h3');
        newsTitle.textContent = newsItem.headline;

        const newsText = document.createElement('p');
        newsText.textContent = newsItem.summary;

        // إضافة المحتوى للخبر
        newsContent.appendChild(newsTitle);
        newsContent.appendChild(newsText);

        // تجميع العناصر
        newsDiv.appendChild(newsImage);
        newsDiv.appendChild(newsContent);

        // إضافة الخبر إلى الحاوية
        newsCarousel.appendChild(newsDiv);

        // إضافة مستمع للنقر على محتوى الخبر لنقل المستخدم إلى صفحة تفاصيل الخبر
        newsContent.addEventListener('click', () => {
            window.location.href = `pages/news-details.html?id=${newsItem.id}`;
        });
    });
}


// تغيير الفيديو في نافذة الفيديوهات
    function changeVideo(videoID) {
        const mainVideoIframe = document.getElementById('main-video-iframe');
        mainVideoIframe.src = `https://www.youtube.com/embed/${videoID}`;
    }

