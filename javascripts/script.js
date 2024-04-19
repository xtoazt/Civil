window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', {
        scope: '/',
    });
});

const urlInput = document.querySelector(".urlInput"),
      suggestionsMenu = document.querySelector(".suggestions"),
      nav = document.querySelector('.nav');

const frame = document.querySelector('iframe');

function hrefChange() {
    const frameDoc = frame.contentDocument;
    const links = frameDoc.querySelectorAll('a');

    links.forEach((a) => {
        a.addEventListener('click', (e) => {
            e.preventDefault();

            if (frame.src !== a.href) {
                frame.src = a.href;
                hrefChange();
            }
        });
    });
};

urlInput.addEventListener("input", () => {
    document.querySelector('.dropdownOptions').style.display = 'none';
    suggestionsMenu.style.display = 'flex';
    const e = urlInput.value.trim();
    if (e == "") {
        suggestionsMenu.style.display = 'none';
        document.querySelector('.dropdownOptions').style.display = 'flex';
    }
    if (e.startsWith('https') || e.startsWith('http')) suggestionsMenu.style.display = 'none';
    let debounceTimeout;
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        getSearchSuggestions(e)
            .then((e) => {
                suggestionsMenu.innerHTML = "";
                if (e.length) {
                    suggestionsMenu.innerHTML = e
                        .map((el) => `<li><a>${el}</a></li>`)
                        .join("");
                    (function() {
                        suggestionsMenu.querySelectorAll('li a')
                            .forEach((a) => {
                                a.addEventListener('click', (e, url = `https://www.google.com/search?q=${e.target.textContent.trim()}`) => {
                                    e.preventDefault();

                                    suggestionsMenu.style.display = 'none';
                                    urlInput.style.display = 'none';
                                    document.querySelector('.header').style.display = 'none';
                                    document.querySelector('.dropdownOptions').style.display = 'none';

                                    frame.style.position = 'absolute';
                                    frame.style.display = 'inline';
                                    frame.style.width = '100%';
                                    frame.style.height = '100%';

                                    frame.src = '/i/' + __uv$config.encodeUrl(url);

                                    hrefChange();

                                    if (frame.style.display == 'inline') {
                                        nav.style.display = 'flex';

                                        nav.querySelector('.ab').addEventListener('click', () => {
                                            const x = window.open();

                                            x.document.head.innerHTML = 
                                                `
                                                    <style>
                                                        *
                                                        {
                                                            margin: 0;
                                                            padding: 0;
                                                            box-sizing: border-box;
                                                            overflow: hidden;
                                                            &::-webkit-scrollbar
                                                            {
                                                                display: none;
                                                            }
                                                        }
                                                    </style>
                                                `;

                                            const h = frame.contentWindow.location.href;

                                            x.document.body.innerHTML = 
                                                `
                                                    <iframe src="${h}" style="position:absolute;border:none;outline:none;width:100%;height:100%;">
                                                `;
                                        });

                                        nav.querySelector('.bk').addEventListener('click', () => {
                                            frame.contentWindow.history.go(-1);
                                        });

                                        nav.querySelector('.fw').addEventListener('click', () => {
                                            frame.contentWindow.history.go(+1);
                                        });

                                        nav.querySelector('.hm').addEventListener('click', () => {
                                            window.location.href = 'https://civil-1.netlify.app';
                                        });
                                    }
                                });
                            });
                    })();
                }
            })
            .catch((error) => console.error(error));
    }, 300);
});

const getSearchSuggestions = (e) =>
    fetch(`https://corsproxy.io/?https://clients1.google.com/complete/search?hl=en&output=toolbar&q=${encodeURIComponent(
                e
            )}`, {
        mode: "cors",
        method: "GET",
    })
    .then((res) => {
        if (!res.ok) throw Error(`Unable to find a match: ${res.status} - ${res.statusText}`);
        return res.text();
    })
    .then((data) => {
        let parser = new DOMParser(),
            xmlDoc = parser.parseFromString(data, "text/xml"),
            suggestions = [];

        for (let i = 0; i < xmlDoc.getElementsByTagName("suggestion").length; i++) suggestions.push(xmlDoc.getElementsByTagName("suggestion")[i].getAttribute("data"));

        return suggestions.slice(0, 10);
    })
    .catch((error) => (console.error(error), []));