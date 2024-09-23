const host = "https://abdelfadeil.github.io/app/";
let data;
// استدعاء الدالة وتحميل البيانات عند تحميل الصفحة
window.onload = function () {
    loadYAMLFile(host + 'data/data.yaml').then(response => {
        if (response) {
            console.log(response); // طباعة البيانات المحملة في وحدة التحكم
            showLoadedNews(response);
            showLoadedArticles(response);
        }
    });
};

// دالة لتحميل وتحويل ملف YAML إلى JSON
async function loadYAMLFile(url ) {
    try {
        // استخدام fetch لتحميل ملف YAML
        const response = await fetch(url);

        // التحقق من أن الطلب كان ناجحاً
        if (!response.ok) {
            throw new Error(`Error fetching the YAML file: ${response.statusText}`);
        }

        // قراءة النص من الرد
        const yamlText = await response.text();

        // تحويل YAML إلى JSON باستخدام js-yaml
        const jsonData = jsyaml.load(yamlText);
        console.log(jsonData);
        data = jsonData;
        return jsonData; // إرجاع البيانات ككائن JSON
    } catch (error) {
        console.error("Failed to load YAML file:", error);
        return null;
    }
}

function navigateToPage(pageUrl) {
    console.log(pageUrl);
    window.location.href = pageUrl;
}



document.addEventListener('DOMContentLoaded', function () {

    document.body.setAttribute('dir', 'rtl');
    const burger = document.getElementById('burger');
    const navList = document.getElementById('nav-list');
    const navLinks = document.querySelectorAll('.nav-list a');
    const hr = document.getElementById('hr');

    // Toggle menu function
    const toggleMenu = () => {
        navList.classList.toggle('show');
        hr.classList.toggle('show');
        burger.classList.toggle('active');
    };

    // Close menu function
    const closeMenu = () => {
        navList.classList.remove('show');
        burger.classList.remove('active');
        hr.classList.remove('show');
    };

    // Burger menu click event
    burger.addEventListener('click', function () {
        toggleMenu();
    });

    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            closeMenu();
        });
    });


    // Close menu when clicking outside the menu
    document.addEventListener('click', function (event) {
        if (!burger.contains(event.target) && !navList.contains(event.target)) {
            closeMenu();
        }
    });

    // Close menu on window resize
    window.addEventListener('resize', function () {
        closeMenu();
    });

    //
    const newsCarousel = document.getElementById('news-carousel');
    let newsIndex = 0;

    // الوظيفة لتحديث الكاروسول حسب المؤشر
    function updateNewsCarousel() {
        newsCarousel.style.transform = `translateX(${newsIndex * 100}%)`;
    }

    // الوظيفة للتحرك إلى العنصر التالي
    function moveToNextNews() {
        newsIndex = (newsIndex + 1) % newsCarousel.children.length;
        updateNewsCarousel();
    }

    // التنقل اليدوي عند الضغط على الأزرار
    document.getElementById('nextNews').addEventListener('click', moveToNextNews);
    document.getElementById('prevNews').addEventListener('click', () => {
        newsIndex = (newsIndex - 1 + newsCarousel.children.length) % newsCarousel.children.length;
        updateNewsCarousel();
    });

    // الانتقال التلقائي كل 2 ثانية
    setInterval(moveToNextNews, 5000);
    // 

});

// استخدام المعرف لجلب المحتوى المناسب بناءً على معرف المقال
// يمكنك الآن عرض تفاصيل المقال بناءً على المعرف


function showLoadedArticles(data) {
    const articles = data.articles;
    const articlesContainer = document.getElementById('articles-section');

    // إنشاء العناصر الخاصة بالمقالات
    articles.forEach(article => {
        const articleItem = document.createElement('article');
        articleItem.classList.add('article-item');
        console.log(article.id);
        articleItem.setAttribute('data-article-id', article.id);

        // إضافة الصورة المصغرة
        const articleThumbnail = document.createElement('img');
        articleThumbnail.src = article.author.image;
        console.log(article.author.image);
        articleThumbnail.alt = article.title;
        articleThumbnail.classList.add('article-thumbnail');

        // إضافة محتوى المقال
        const articleContent = document.createElement('div');
        articleContent.classList.add('article-item-content');

        const articleTitle = document.createElement('h3');
        articleTitle.textContent = article.title;

        articleContent.appendChild(articleTitle);
        //
        if (currentPath.includes('article-details.html')) {
            // إذا كانت الصفحة هي صفحة تفاصيل المقال
            const articleLink = document.createElement('a');
            articleLink.href = `https://abdelfadeil.github.io/app/pages/article-details.html?id=${article.id}`;
            articleLink.textContent = "اقرأ المزيد";
            articleContent.appendChild(articleLink);
        } else {
            // إذا كانت الصفحة هي الصفحة الرئيسية أو صفحة أخرى
            //articleLink.href = `https://abdelfadeil.github.io/app/pages/article-details.html?id=${article.id}`;
            //articleLink.textContent = "اقرأ المزيد";
            const articleParagraphe = document.createElement('p');
            articleParagraphe.textContent = article.author.name;
            articleContent.appendChild(articleParagraphe);
            articleItem.classList.add('article-item-home-page');
        }
        //

        // تجميع العناصر
        articleItem.appendChild(articleThumbnail);
        articleItem.appendChild(articleContent);

        // إضافة المقال إلى الحاوية
        articlesContainer.appendChild(articleItem);
        // الحصول على جميع العناصر التي تحتوي على المقالات
        const articleItems = document.querySelectorAll('.article-item-home-page');
        console.log(articleItems.length);
        // إضافة مستمع للنقر على كل عنصر article-item
        articleItems.forEach(item => {
            item.addEventListener('click', function () {
                // استخراج معرف المقال من data-article-id
                const articleId = item.getAttribute('data-article-id');
                console.log("articleId", articleId);
                // نقل الزائر إلى صفحة المقال بناءً على معرف المقال
                window.location.href = `https://abdelfadeil.github.io/app/pages/article-details.html?id=${articleId}`;
            });
        });
    });
}


function showLoadedNews(data) {
    const news = data.news;
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
            window.location.href = `https://abdelfadeil.github.io/app/pages/news-details.html?id=${newsItem.id}`;
        });
    });
}


// تغيير الفيديو في نافذة الفيديوهات
    function changeVideo(videoID) {
        const mainVideoIframe = document.getElementById('main-video-iframe');
        mainVideoIframe.src = `https://www.youtube.com/embed/${videoID}`;
    }

