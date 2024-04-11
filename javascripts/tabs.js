/*
    EXPIRED!

    const inp = document.querySelector('.urlInput');
    const ifr = document.querySelector('iframe');

    inp.addEventListener('input', (e) => {
        const f = e.target.value.trim();
        inp.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
        
                ifr.style.display = 'inline-block';

                ifr.src = `https://www.browserling.com/browse/win10/chrome122/${f}`;

                if (ifr.contentDocument && ifr.contentWindow) {
                    ifr.contentDocument.getElementById('main-menu').style.display = 'none';
                    ifr.contentWindow.eval(window.onbeforeunload = () => 1);
                } else {
                    ifr.addEventListener('load', () => {
                        ifr.contentDocument.getElementById('main-menu').style.display = 'none';
                    });
                }
            }
        });
    });
*/