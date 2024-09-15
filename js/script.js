
function navigateToPage(pageUrl) {
    console.log(pageUrl);
    window.location.href = pageUrl;
}
        document.addEventListener('DOMContentLoaded', function() {

            const burger = document.getElementById('burger');
            const navList = document.getElementById('nav-list');
            const navLinks = document.querySelectorAll('.nav-list a');

            // Toggle menu function
            const toggleMenu = () => {
                navList.classList.toggle('show');
                burger.classList.toggle('active');
            };

            // Close menu function
            const closeMenu = () => {
                navList.classList.remove('show');
                burger.classList.remove('active');
            };

            // Burger menu click event
            burger.addEventListener('click', function() {
                toggleMenu();
            });

            // Close menu when clicking on nav links
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    closeMenu();
                });
            });

            // Close menu when clicking outside the menu
            document.addEventListener('click', function(event) {
                if (!burger.contains(event.target) && !navList.contains(event.target)) {
                    closeMenu();
                }
            });

            // Close menu on window resize
            window.addEventListener('resize', function() {
                closeMenu();
            });
        });
