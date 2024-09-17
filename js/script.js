
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
  
  document.getElementById('nextNews').addEventListener('click', () => {
      newsIndex = (newsIndex + 1) % newsCarousel.children.length;
      updateNewsCarousel();
  });
  
  document.getElementById('prevNews').addEventListener('click', () => {
      newsIndex = (newsIndex - 1 + newsCarousel.children.length) % newsCarousel.children.length;
      updateNewsCarousel();
  });
  
  function updateNewsCarousel() {
      newsCarousel.style.transform = `translateX(-${newsIndex * 100}%)`;
  }
  
  // 
  
});

  