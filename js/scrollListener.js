// Wrapped in a closure to prevent global variables
(() => {
    var NavBar = document.getElementById('mainNav');

    const HomeSection = document.getElementById('home'),
          homeSectionStart = HomeSection.offsetTop,
          homeSectionEnd   = HomeSection.offsetTop + HomeSection.offsetHeight - NavBar.offsetHeight;

    const AboutSection = document.getElementById('about');

    const SkillsetSection = document.getElementById('skillset');

    const ReferencesSection = document.getElementById('references');

    const animatedItems = document.querySelectorAll('.animate-in');

    function animateElements() {
        const animateElementsObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    return;
                }

                const targetElement = entry.target;

                animateElementsObserver.unobserve(targetElement);
                targetElement.classList.add("animate-in-run");
            });
        }, {threshold: 1});

        animatedItems.forEach(function (animatedItem) {
            animateElementsObserver.observe(animatedItem);
        });
    }

    /**
     * Adds class "with-background" to the nav bar if the window is scrolled past the Home section.
     */
    function animateNavbar() {
        const styleNavbarObserver = new IntersectionObserver(function (observerEntries, observer) {
            observerEntries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    NavBar.classList.add('with-background');
                    return;
                }

                NavBar.classList.remove('with-background');
            });
        }, {threshold: 1});

        styleNavbarObserver.observe(HomeSection);
    }

    /**
     * Adds class "active" to the currently viewed section's nav-link.
     */
    function animateNavLinks() {
        const navLinkUpdateObserver = new IntersectionObserver(function (observerEntries, observer) {
            observerEntries.forEach(function (entry) {
                const NavLink = document.getElementById(entry.target.dataset.navLinkId);

                if (!entry.isIntersecting) {
                    NavLink.classList.remove('active');
                    return;
                }

                NavLink.classList.add('active');
            });
        }, {threshold: 0.6});

        navLinkUpdateObserver.observe(AboutSection);
        navLinkUpdateObserver.observe(SkillsetSection);
        navLinkUpdateObserver.observe(ReferencesSection);
    }


    /**
     * Sets the brightness of the home-section depending on the scroll distance.
     * The further the user scrolled the darker the home section becomes
     */
    function fadeoutHomeSection() {
        new IntersectionObserver(function (observerEntries, observer) {
            observerEntries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    return;
                }

                HomeSection.style.filter = 'brightness(' + entry.intersectionRatio + ')';
            });
        }, {
            threshold: [
                0,
                0.2,
                0.4,
                0.6,
                0.8,
                1
            ]
        }).observe(HomeSection);
    }

    /**
     * Disables star movement when scrolled past home section to improve performance.
     * Re-enables it when scrolling to home section.
     */
    function toggleStarMovement() {
        new IntersectionObserver(function (observerEntries, observer) {
            observerEntries.forEach(function (entry) {
                if (typeof MyStars === 'undefined') {
                    return;
                }

                if (!entry.isIntersecting) {
                    MyStars.stopMoving()

                    return;
                }

                MyStars.startMoving()
            });
        }, {threshold: 0.25}).observe(HomeSection);
    }

    fadeoutHomeSection();

    // Initially style the navbar correctly if we're already scrolled past home section.
    // This could happen if the page get's reloaded.
    animateNavbar();

    // Initially update the nav-links to set the correct link active.
    // The correct link is the section that's currently in view.
    // This could be something different than home, if the page get's reloaded.
    animateNavLinks();

    toggleStarMovement();

    animateElements();
})();
