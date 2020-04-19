(function () {
    var ReferencesWrapper = document.getElementById('references-wrapper'),
        ReferencesExtendButton = document.getElementById('references-extend-button');

    ReferencesExtendButton.addEventListener('click', () => {
        ReferencesExtendButton.classList.toggle('extended');
        ReferencesWrapper.classList.toggle('extended');
    });
})();
