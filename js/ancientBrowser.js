(function() {
    var Overlay = document.createElement('div');

    Overlay.className = 'overlay';
    Overlay.id = 'ancient-browser-overlay';
    Overlay.innerHTML = '' +
                        '<link rel="stylesheet" href="/css/ancientBrowser.css">' +
                        '<p>Hey there,</p>' +
                        '<p>it seems like you are using an ancient browser.</p>' +
                        '<p>Some functions may not work and the layout might be broken.</p>' +
                        '<p>' +
                            'You should consider using <a href="https://www.mozilla.org/en-US/firefox/" rel="nofollow noopener" target="_blank">FireFox</a>, ' +
                            '<a href="https://www.google.com/chrome/" rel="nofollow noopener" target="_blank">Chrome</a> or even ' +
                            '<a href="https://www.microsoft.com/edge" rel="nofollow noopener" target="_blank">Edge</a>.' +
                        '</p>' +
                        '<p>If you want to look around anyways:</p>' +
                        '<p>'+
                            '<button onclick="'+
                                'document.getElementById(\'ancient-browser-overlay\').style.display = \'none\';' +
                                'document.body.style.overflow = \'auto\';' +
                            '">Close This Message</button>' +
                        '</p>';

    document.body.appendChild(Overlay);
})();
