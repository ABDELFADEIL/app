// استخراج معرف الخبر من الـ URL
urlParams = new URLSearchParams(window.location.search);
const newsId = urlParams.get('id');


// دالة تستخدم البيانات بعد تحميلها
async function useData() {
    try {
        // انتظار تحميل البيانات
        const { news, articles } = await dataPromise;

        // الآن يمكنك استخدام البيانات
        console.log("الأخبار:", news);
        console.log("المقالات:", articles);

        // تنفيذ كود إضافي باستخدام البيانات
        console.log(news); // طباعة البيانات المحملة في وحدة التحكم
        // البحث عن الخبر بناءً على المعرف
        const currentNews = news.find(newsItem => newsItem.id == newsId);

        if (currentNews) {
            // عرض تفاصيل الخبر
            console.log(currentNews)
            document.getElementById('news-title').textContent = currentNews.headline;
            document.getElementById('publish-date').textContent = `تاريخ النشر: ${currentNews.date}`;
            document.getElementById('news-image').src = currentNews.image;
            document.getElementById('news-content').textContent = currentNews.summary;
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
            otherNewsImage.alt = otherNews.headline;
            otherNewsImage.classList.add('other-news-image');

            const otherNewsTitle = document.createElement('p');
            otherNewsTitle.classList.add('other-news-title');
            otherNewsTitle.textContent = otherNews.headline;

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

        newsItems = news.filter(newsItem => newsItem.id != newsId); // تخزين الأخبار في المتغير newsItems
        displayNewsPage(newsItems, currentPage); // عرض الصفحة الأولى من الأخبار
    } catch (error) {
        console.error("Failed to load data:", error);
    }
}

// استخدام then و catch للتعامل مع الـ Promise
useData();


window.onload = function () {

};


// إعداد pagination
let currentPage = 1;
const newsPerPage = 5; // عدد الأخبار في كل صفحة
let newsItems = []; // تعريف المتغير newsItems

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
        otherNewsImage.alt = otherNews.headline;
        otherNewsImage.classList.add('other-news-image');

        const otherNewsTitle = document.createElement('p');
        otherNewsTitle.classList.add('other-news-title');
        otherNewsTitle.textContent = otherNews.headline;

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
            button.classList.add('active'); // إضافة class 'active' للصفحة الحالية
        }
        button.addEventListener('click', () => {
            displayNewsPage(newsItems, i); // تحديث الأخبار بناءً على الصفحة
        });
        paginationContainer.appendChild(button);
    }
}
