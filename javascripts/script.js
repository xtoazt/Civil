const urlInput = document.querySelector(".urlInput"),
      suggestionsMenu = document.querySelector(".suggestions");

const frame = document.querySelector('iframe');

const corsUrl = 'https://cors-anywhere.herokuapp.com/';

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
                    suggestionsMenu.querySelectorAll('li a')
                        .forEach(a => {
                            a.addEventListener(
                                "click",
                                (e) => {
                                    e.preventDefault();

                                    frameLoad(`https://www.google.com/search?q=${encodeURIComponent(e.target.textContent.trim())}`);
                                }
                            );
                        });
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

async function frameLoad(url) {
    await fetch(corsUrl + url)
        .then((res) => res.text())
        .then((text) => {
            document.write(text);
        })
        .catch((err) => console.error(err));

    document.querySelectorAll('[src]')
        .forEach((elem) => {
            if (elem.getAttribute('src').startsWith('/') && url.startsWith('https://www.google.com/')) {
                let newSrc = 'https://api.allorigins.win/raw?url=' + 'https://www.google.com' + elem.getAttribute('src');
                elem.setAttribute('src', newSrc);
            }
        });

    window.onbeforeunload = () => 1; /* Makes the page single-use */

    updateATags();
};

function updateATags() {
    document.querySelectorAll('a')
        .forEach((a) => {
            a.addEventListener('click', (e) => {
                e.preventDefault();
                fetch(corsUrl + a.href)
                    .then((res) => res.text())
                    .then((text) => {
                        document.documentElement.innerHTML = text;
                        if (a.href.startsWith('/')) {
                            a.href = corsUrl + 'https://www.google.com' + a.getAttribute('href');
                        } else {
                            document.querySelector('head').insertAdjacentHTML('afterbegin', `<base href="${a.href}">`);
                        }
                        updateATags();
                    })
                    .catch((err) => console.error(err));
            });
        });
};

// Inspired off of:
// https://github.com/binary-person/womginx/blob/master/public/wombat-handler.js#L3
// Please take a look at that file to get a brief understanding of what this code
// does under the hood.

/* function rewrite() {
    const rewriteDoubleSlash = window.location.pathname.match(/\/main(?<mod>\/[^\/_]+_)?(?<url_preslash>\/(?:http|ws)s?:\/)(?<url_postslash>[^\/].*)/);

    if (rewriteDoubleSlash) {
        window.history.pushState(null, null, '/languagearts' + (rewriteDoubleSlash.groups.mod || '') + rewriteDoubleSlash.groups.url_postslash + window.location.hash);
    }
    
    const mergeDoubleSlash = (url) => {
        if (!rewriteDoubleSlash || !/^((http|ws)s?:\/)/.test(url.toString())) {
            return url;
        }

        return url.toString().slice(0, 7) + url.toString().slice(7).replace(/\/+/g, '/');
    }
} */