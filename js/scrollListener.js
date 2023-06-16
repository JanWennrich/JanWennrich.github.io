// Wrapped in a closure to prevent global variables
(() => {
    const NavBar = document.getElementById('mainNav');

    const HomeSection = document.getElementById('home');

    const AboutSection = document.getElementById('about');

    const SkillsetSection = document.getElementById('skillset');

    const ReferencesSection = document.getElementById('references');

    const animatedItems = document.querySelectorAll('.animate-in');

    function animateElements() {
        const animateElementsObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    return;
                }

                const targetElement = entry.target;

                animateElementsObserver.unobserve(targetElement);
                targetElement.classList.add("animate-in-run");
            });
        }, {threshold: 0.75});

        animatedItems.forEach(function (animatedItem) {
            animateElementsObserver.observe(animatedItem);
        });
    }

    /**
     * Adds class "with-background" to the nav bar if the window is scrolled past the Home section.
     */
    function animateNavbar() {
        const styleNavbarObserver = new IntersectionObserver(function (observerEntries) {
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
        const navLinkUpdateObserver = new IntersectionObserver(function (observerEntries) {
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
        new IntersectionObserver(function (observerEntries) {
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
     * Disables star movement when scrolled past the home section to improve performance.
     * Re-enables it when scrolling to the home section.
     */
    function toggleStarMovement() {
        new IntersectionObserver(function (observerEntries) {
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

    // Initially style the navbar correctly if we're already scrolled past the home section.
    // This could happen if the page is reloaded.
    animateNavbar();

    // Initially update the nav-links to set the correct link active.
    // The correct link is the section that's currently in view.
    // This could be something different from home if the page is reloaded.
    animateNavLinks();

    toggleStarMovement();

    animateElements();
})();
