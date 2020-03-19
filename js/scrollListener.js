// Wrapped in a closure to prevent global variables
(function () {
    var NavBar = document.getElementById('mainNav');

    var HomeSection = document.getElementById('home');
    var homeSectionEnd = HomeSection.offsetTop + HomeSection.offsetHeight - NavBar.offsetHeight;

    /**
     * Adds class "with-background" to the nav bar if the window is scrolled past the Home section.
     */
    function styleNavbar()
    {
        let isScrolledPastHome = window.scrollY > homeSectionEnd;

        if (isScrolledPastHome && NavBar.classList.contains('with-background')) {
            return;
        }

        if (isScrolledPastHome) {
            NavBar.classList.add('with-background');
            return;
        }

        NavBar.classList.remove('with-background');
    }

    document.addEventListener('scroll', styleNavbar, {capture: false, passive: true});

    // Initially style the navbar correctly if we're already scrolled past home section.
    // This could happen if the page get's reloaded.
    styleNavbar();
})();
