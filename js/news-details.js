// استخراج معرف الخبر من الـ URL
const urlParams = new URLSearchParams(window.location.search);
const newsId = urlParams.get('id');

// جلب الأخبار من ملف JSON
fetch('https://abdelfadeil.github.io/app/data/articles.json')
    .then(response => response.json())
    .then(data => {
        const news = data.news;

        // البحث عن الخبر بناءً على المعرف
        const currentNews = news.find(newsItem => newsItem.id == newsId);

        if (currentNews) {
            // عرض تفاصيل الخبر
            document.getElementById('news-title').textContent = currentNews.title;
            document.getElementById('publish-date').textContent = `تاريخ النشر: ${currentNews.date}`;
            document.getElementById('news-image').src = currentNews.image;
            document.getElementById('news-content').textContent = currentNews.content;
        } else {
            console.error('خبر غير موجود');
        }

        // عرض الأخبار الأخرى (التي ليست الخبر الحالي)
        const otherNewsContainer = document.getElementById('other-news');
        news.filter(newsItem => newsItem.id != newsId).forEach(otherNews => {
            const otherNewsDiv = document.createElement('div');
            otherNewsDiv.classList.add('other-news-item');

            const otherNewsImage = document.createElement('img');
            otherNewsImage.src = otherNews.image;
            otherNewsImage.alt = otherNews.title;
            otherNewsImage.classList.add('other-news-image');

            const otherNewsTitle = document.createElement('p');
            otherNewsTitle.classList.add('other-news-title');
            otherNewsTitle.textContent = otherNews.title;

            const otherNewsDate = document.createElement('p');
            otherNewsDate.classList.add('other-news-date');
            otherNewsDate.textContent = otherNews.date;

            otherNewsDiv.appendChild(otherNewsImage);
            otherNewsDiv.appendChild(otherNewsTitle);
            otherNewsDiv.appendChild(otherNewsDate);

            // عند النقر، الانتقال إلى صفحة تفاصيل الخبر
            otherNewsDiv.addEventListener('click', () => {
                window.location.href = `news-details.html?id=${otherNews.id}`;
            });

            otherNewsContainer.appendChild(otherNewsDiv);
        });
    })
    .catch(error => console.error('خطأ في جلب الأخبار:', error));

    // إعداد pagination
let currentPage = 1;
const newsPerPage = 5;

// دالة لعرض الأخبار بناءً على الصفحة الحالية
function displayNewsPage(newsItems, page) {
    const startIndex = (page - 1) * newsPerPage;
    const endIndex = startIndex + newsPerPage;

    // عرض الأخبار بناءً على النطاق المحدد
    const newsToShow = newsItems.slice(startIndex, endIndex);

    const otherNewsContainer = document.getElementById('other-news');
    otherNewsContainer.innerHTML = ''; // تنظيف المحتوى السابق

    newsToShow.forEach(otherNews => {
        const otherNewsDiv = document.createElement('div');
        otherNewsDiv.classList.add('other-news-item');

        const otherNewsImage = document.createElement('img');
        otherNewsImage.src = otherNews.image;
        otherNewsImage.alt = otherNews.title;
        otherNewsImage.classList.add('other-news-image');

        const otherNewsTitle = document.createElement('p');
        otherNewsTitle.classList.add('other-news-title');
        otherNewsTitle.textContent = otherNews.title;

        const otherNewsDate = document.createElement('p');
        otherNewsDate.classList.add('other-news-date');
        otherNewsDate.textContent = otherNews.date;

        otherNewsDiv.appendChild(otherNewsImage);
        otherNewsDiv.appendChild(otherNewsTitle);
        otherNewsDiv.appendChild(otherNewsDate);

        // عند النقر، الانتقال إلى صفحة تفاصيل الخبر
        otherNewsDiv.addEventListener('click', () => {
            window.location.href = `news-details.html?id=${otherNews.id}`;
        });

        otherNewsContainer.appendChild(otherNewsDiv);
    });

    // عرض أزرار pagination
    displayPaginationButtons(newsItems.length, page);
}

// دالة لعرض أزرار pagination
function displayPaginationButtons(totalItems, currentPage) {
    const totalPages = Math.ceil(totalItems / newsPerPage);
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = ''; // تنظيف الأزرار السابقة

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        if (i === currentPage) {
            button.disabled = true; // تعطيل الزر الحالي
        }
        button.addEventListener('click', () => {
            displayNewsPage(newsItems, i); // تحديث الأخبار بناءً على الصفحة
        });
        paginationContainer.appendChild(button);
    }
}

// استدعاء الأخبار من JSON ثم تطبيق pagination
fetch('https://abdelfadeil.github.io/app/data/articles.json')
    .then(response => response.json())
    .then(data => {
        const news = data.news;
        displayNewsPage(news, currentPage);
    })
    .catch(error => console.error('خطأ في جلب الأخبار:', error));
