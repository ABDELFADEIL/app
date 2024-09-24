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
    if (window.location.pathname === '/home.html') {

    }
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
