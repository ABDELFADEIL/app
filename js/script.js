
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
    const newsCarousel = document.getElementById('newsCarousel');
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
  // الحصول على جميع العناصر التي تحتوي على المقالات
  const articleItems = document.querySelectorAll('.article-item');

  // إضافة مستمع للنقر على كل عنصر article-item
  articleItems.forEach(item => {
      item.addEventListener('click', function() {
          // استخراج معرف المقال من data-article-id
          const articleId = this.getAttribute('data-article-id');
          
          // نقل الزائر إلى صفحة المقال بناءً على معرف المقال
          window.location.href = `pages/article-details.html?id=${articleId}`;
      });

  
  // استخراج معرف المقال من الـ URL
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get('id');
  
  // طباعة المعرف للتحقق
  console.log('معرف المقال:', articleId);
  
  // استخدام المعرف لجلب المحتوى المناسب بناءً على معرف المقال
  // يمكنك الآن عرض تفاصيل المقال بناءً على المعرف
  
  // الحصول على المسار الحالي للصفحة
const currentPath = window.location.pathname;

// تحديد المسار الصحيح لملف JSON بناءً على الصفحة
let jsonFilePath;
if (currentPath.includes('article-details.html')) {
    // إذا كانت الصفحة هي صفحة تفاصيل المقال
    jsonFilePath = '../../app/data/articles.json';
} else {
    // إذا كانت الصفحة هي الصفحة الرئيسية أو صفحة أخرى
    jsonFilePath = '../app/data/articles.json';
}

  // جلب المقالات من ملف JSON
  fetch(jsonFilePath)
  .then(response => response.json())
  .then(data => {
      const articles = data.articles;
      const articlesContainer = document.getElementById('articles-section');
  
      // إنشاء العناصر الخاصة بالمقالات
      articles.forEach(article => {
          const articleItem = document.createElement('article');
          articleItem.classList.add('article-item');
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
  
          const articleLink = document.createElement('a');
          articleLink.href = `pages/article-details.html?id=${article.id}`;
          articleLink.textContent = "اقرأ المزيد";
  
          articleContent.appendChild(articleTitle);
          articleContent.appendChild(articleLink);
  
          // تجميع العناصر
          articleItem.appendChild(articleThumbnail);
          articleItem.appendChild(articleContent);
  
          // إضافة المقال إلى الحاوية
          articlesContainer.appendChild(articleItem);
      });
  })
  .catch(error => console.error('خطأ في جلب المقالات:', error));
});
