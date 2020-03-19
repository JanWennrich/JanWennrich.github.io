// Wrapped in a closure to prevent global variables
(function () {
    var NavBar            = document.getElementById('mainNav'),
        NavLinkHome       = document.getElementById('nav-link-home'),
        NavLinkAbout      = document.getElementById('nav-link-about'),
        NavLinkSkillset   = document.getElementById('nav-link-skillset'),
        NavLinkReferences = document.getElementById('nav-link-references');

    var HomeSection      = document.getElementById('home'),
        homeSectionStart = HomeSection.offsetTop,
        homeSectionEnd   = HomeSection.offsetTop + HomeSection.offsetHeight - NavBar.offsetHeight;

    var AboutSection      = document.getElementById('about'),
        aboutSectionStart = AboutSection.offsetTop - NavBar.offsetHeight;

    var SkillsetSection      = document.getElementById('skillset'),
        skillsetSectionStart = SkillsetSection.offsetTop - NavBar.offsetHeight;

    var ReferencesSection      = document.getElementById('references'),
        referencesSectionStart = ReferencesSection.offsetTop - NavBar.offsetHeight;

    /**
     * Adds class "with-background" to the nav bar if the window is scrolled past the Home section.
     */
    function styleNavbar()
    {
        var isScrolledPastHome = window.scrollY > homeSectionEnd;

        if (isScrolledPastHome && NavBar.classList.contains('with-background')) {
            return;
        }

        if (isScrolledPastHome) {
            NavBar.classList.add('with-background');
            return;
        }

        NavBar.classList.remove('with-background');
    }

    /**
     * Adds class "active" to the currently viewed section's nav-link.
     */
    function updateNavLinks()
    {
        var isScrolledPastReferences = window.scrollY > referencesSectionStart;

        if (isScrolledPastReferences) {
            addActiveClassToElement(NavLinkReferences);

            return;
        }

        var isScrolledPastSkillset = window.scrollY > skillsetSectionStart;

        if (isScrolledPastSkillset) {
            addActiveClassToElement(NavLinkSkillset);

            return;
        }

        var isScrolledPastAbout = window.scrollY > aboutSectionStart;

        if (isScrolledPastAbout) {
            addActiveClassToElement(NavLinkAbout);

            return;
        }

        var isScrolledPastHome = window.scrollY > homeSectionStart;

        if (isScrolledPastHome) {
            addActiveClassToElement(NavLinkHome);

            return;
        }
    }

    /**
     * Adds the class "active" to the given element.
     *
     * @param Element
     */
    function addActiveClassToElement(Element)
    {
        // Only reset other items and set it active, if it isn't already active
        if (!Element.classList.contains('active')) {
            resetNavLinks();

            Element.classList.add('active');
        }
    }

    /**
     * Removes class "active" from all nav-links
     */
    function resetNavLinks()
    {
        NavLinkHome.classList.remove('active');
        NavLinkAbout.classList.remove('active');
        NavLinkSkillset.classList.remove('active');
        NavLinkReferences.classList.remove('active');
    }

    document.addEventListener('scroll', function () {
        styleNavbar();
        updateNavLinks();
    }, {capture: false, passive: true});

    // Initially style the navbar correctly if we're already scrolled past home section.
    // This could happen if the page get's reloaded.
    styleNavbar();

    // Initially update the nav-links to set the correct link active.
    // The correct link is the section that's currently in view.
    // This could be something different than home, if the page get's reloaded.
    updateNavLinks();
})();