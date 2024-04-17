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
                    (function() {
                        suggestionsMenu.querySelectorAll('li a')
                            .forEach((a) => {
                                a.addEventListener('click', (e) => {
                                    e.preventDefault();
                                    
                                    window.location.href = '/languagearts/' + `https://www.google.com/search?q=${a.textContent}`;
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

// Inspired off of:
// https://github.com/binary-person/womginx/blob/master/public/wombat-handler.js#L3
// Please take a look at that file to get a brief understanding of what this code
// does under the hood.

(function rewrite() {
    const rewriteDoubleSlash = window.location.pathname.match(/\/languagearts(?<mod>\/[^\/_]+_)?(?<url_preslash>\/(?:http|ws)s?:\/)(?<url_postslash>[^\/].*)/);

    if (rewriteDoubleSlash) {
        window.history.pushState(null, null, '/languagearts' + (rewriteDoubleSlash.groups.mod || '') + rewriteDoubleSlash.groups.url_preslash + '/' + rewriteDoubleSlash.groups.url_postslash + window.location.hash);
    }

    const mergeDoubleSlash = (url) => {
        if (!rewriteDoubleSlash || !/^((http|ws)s?:\/)/.test(url.toString())) {
            return url;
        }
        return url.toString().slice(0, 7) + url.toString().slice(7).replace(/\/+/g, '/');
    };

    const proxy_dest_split = window.location.pathname.split(/(?=\/)/);
    const proxy_prefix = window.location.protocol + "//" + window.location.host;
    const proxy_path = proxy_dest_split.shift() + "/";
    const dest_fullurl = proxy_dest_split.join("").slice(1);
    const dest_schemeMatch = dest_fullurl.match(/^[^:]*/);
    const dest_scheme = dest_schemeMatch ? dest_schemeMatch[0] : "";
    const dest_hostMatch = dest_fullurl.match(/^[^:]*:\/\/([^/]*)/);
    const dest_host = dest_hostMatch ? dest_hostMatch[1] : "";

    const url = dest_fullurl;
    const timestamp = ""; 
    const request_ts = ""; 
    const prefix = proxy_prefix + proxy_path;
    const mod = "";
    const top_url = proxy_prefix + proxy_path + dest_fullurl;
    const is_framed = false;
    const is_live = true;
    const coll = "";
    const proxy_magic = "";
    const static_prefix = proxy_prefix + "/wombat/dist/";
    const wombat_ts = ""; 
    const wombat_scheme = dest_scheme;
    const wombat_host = dest_host;
    const wombat_sec = "1"; 
    const wombat_opts = {};

    const absoluteMatch = /^(\/|https?:\/\/|data:image\/png;)/;

    if (window && window._WBWombat && !window._wb_js_inited && !window._wb_wombat) {
        window.history._civil_replaceState = window.history.replaceState;
        window.history.replaceState = function (stateObj, title, url) {
            if (window.location.pathname.startsWith("/languagearts/https://www.google.com")) {
                url = "";
            }
            return this._civil_replaceState(stateObj, title, url);
        };

        window.XMLHttpRequest.prototype._civil_open = window.XMLHttpRequest.prototype.open;
        window.XMLHttpRequest.prototype.open = function (method, url, async, username, password) {
            return this._civil_open(method, mergeDoubleSlash(url), async, username, password);
        };
        window.XMLHttpRequest.prototype.url
        window._civil_fetch = window.fetch;
        window.fetch = function (input, init) {
            if (typeof input === 'string') {
                return window._civil_fetch(mergeDoubleSlash(input), init);
            }
            const request = new Request(input, init);
            return _civil_fetch(mergeDoubleSlash(input.url), request);
        };

        window._civil_WebSocket = window.WebSocket;
        window.WebSocket = function (url, protocols) {
            url = url + '?civil_ws_origin_header=' + dest_scheme + '://' + dest_host;
            return new window._civil_WebSocket(mergeDoubleSlash(url), protocols);
        };

        _WBWombat.prototype.initDateOverride = function () { };

        _WBWombat.prototype.initSeededRandom = function () { };

        _WBWombat.prototype.initStorageOverride = function () { };
        const localStorage = window.localStorage;
        const localStorageSetItem = localStorage.setItem;
        const hostLocalStorage = {};
        try {
            if (localStorage.getItem(dest_host)) {
                hostLocalStorage = JSON.parse(localStorage.getItem(dest_host));
                if (typeof hostLocalStorage !== 'object') hostLocalStorage = {};
            }
        } catch (e) { }

        const timeoutLocalStorage = -1;
        const saveLocalStorage = function () {
            if (timeoutLocalStorage === -1) {
                timeoutLocalStorage = setTimeout(function () {
                    timeoutLocalStorage = -1;
                    localStorageSetItem.call(localStorage, dest_host, JSON.stringify(hostLocalStorage));
                }, 50);
            }
        };
        localStorage.key = function (number) {
            return Object.keys(hostLocalStorage)[number];
        };
        localStorage.getItem = function (key) {
            if (hostLocalStorage[key] === undefined) return null;
            return hostLocalStorage[key];
        };
        localStorage.setItem = function (key, value) {
            hostLocalStorage[key] = value;
            saveLocalStorage();
        };
        localStorage.removeItem = function (key) {
            delete hostLocalStorage[key];
            saveLocalStorage();
        };
        localStorage.clear = function () {
            hostLocalStorage = {};
            saveLocalStorage();
        };

        window._wb_wombat = new _WBWombat(window, wbinfo);
        window._wb_wombat.wombatInit();

        window._civil_Blob = window.Blob;
        window.Blob = function (data, options = {}) {
            return new window._civil_Blob(data, options);
        };

        window._wb_wombat._civil_rewriteWorker = window._wb_wombat.rewriteWorker;
        window._wb_wombat.rewriteWorker = function (workerUrl) {

            workerUrl = workerUrl.toString();

            if (!workerUrl) return workerUrl;
            const isBlob = workerUrl.indexOf("blob:") === 0;
            const isJS = workerUrl.indexOf("javascript:") === 0;
            if (!isBlob && !isJS) {

                const request = new XMLHttpRequest();
                request.open("GET", workerUrl, false);
                request.send();
                workerUrl = window.URL.createObjectURL(new Blob([request.responseText], { type: 'application/javascript' }));
            }
            return this._civil_rewriteWorker(workerUrl);
        };

        const addedStyles = [];
        const addStyleContent = function (cssText, relativePath, removeElem, async) {
            const style = document.createElement("style");
            if (relativePath) {
                const replacer = function (match, n1, n2, n3, offset, string) {
                    const rewrittenN2 = n2;

                    if (absoluteMatch.test(n2)) {
                        rewrittenN2 = window._wb_wombat.rewriteUrl(n2);
                    } else {
                        rewrittenN2 = relativePath + n2
                    }

                    if (n1.startsWith("url") && string.slice(0, offset).trim().endsWith("@import")) {
                        addStyle(rewrittenN2, null, async);
                        return "''";
                    }
                    if (n1.startsWith("@import")) {
                        if (n2.trim()) {

                            addStyle(rewrittenN2, null, async);
                            return "";
                        } else {

                            return "";
                        }
                    }
                    return n1 + rewrittenN2 + n3;
                };
                style.textContent = cssText
                    .replace(window._wb_wombat.STYLE_REGEX, replacer)
                    .replace(window._wb_wombat.IMPORT_REGEX, replacer);;
            } else {
                style.textContent = cssText;
            }
            if (removeElem) {
                if (removeElem.tagName === "STYLE") {
                    removeElem.textContent = style.textContent;
                } else {
                    if (removeElem.parentNode) {
                        removeElem.parentNode.insertBefore(style, removeElem);
                    }
                    removeElem.remove();
                }
            } else {
                document.head.appendChild(style);
            }
        };
        const addStyle = function (linkToStyle, oldLinkElem, async = true) {
            if (addedStyles.includes(linkToStyle)) return;
            const request = new XMLHttpRequest(); 
            request.onload = function () {
                if (request.status < 400) {
                    addedStyles.push(linkToStyle);
                    const relativeMatch = /^[^]*/;
                    const relativePath = linkToStyle.match(relativeMatch);
                    relativePath = relativePath ? relativePath[0] : "";
                    addStyleContent(request.responseText, relativePath, oldLinkElem);
                }
            };
            request.open("GET", linkToStyle, async);
            request.send();
        };
        window._wb_wombat._civil_rewriteElem = window._wb_wombat.rewriteElem;
        window._wb_wombat.rewriteElem = function (elem) {

            if (elem && elem.tagName === "LINK" && elem.rel === "stylesheet"
                && elem.getAttribute("href").indexOf("data:text/css") !== 0) {

            } else if (elem.tagName === "STYLE") {

            }
            return this._civil_rewriteElem(elem);
        };

        window.addEventListener("DOMContentLoaded", function () {
            const elements = Array.from(document.getElementsByTagName("*"));
            for (const i = 0; i < elements.length; i++) {

                if (elements[i].tagName !== "IMG" && elements[i].hasAttribute(processed_flag_attribute)) {
                    continue;
                }
                if (elements[i].tagName === "SCRIPT" && absoluteMatch.test(elements[i].src)) {
                    const script = elements[i].cloneNode();
                    elements[i].parentNode.insertBefore(script, elements[i]);
                } else {
                    window._wb_wombat.rewriteElem(elements[i]);
                }
            }
        });

        const getProxyUrl = function () {
            return window.location.href.match(/^https?:\/\/[^\/]+\/languagearts(\/[^_\/]+_)?\/(.*)/)[2];

        };

        const previousLocation = window.location.href;
        const locationObj = new URL(getProxyUrl());
        const updateLocationObj = function () {
            if (window.location.href !== previousLocation) {
                locationObj = new URL(getProxyUrl());
            }
        };
        const currentLocationProp = {
            get ancestorOrigins() {
                updateLocationObj();
                return window.location.ancestorOrigins;
            },
            get href() {
                updateLocationObj();
                return locationObj.href;
            },
            set href(value) {
                window.location.href = window._wb_wombat.rewriteUrl(value);
            },
            get protocol() {
                updateLocationObj();
                return locationObj.protocol;
            },
            set protocol(value) {
                window.location.protocol = value;
            },
            get host() {
                updateLocationObj();
                return locationObj.host;
            },
            set host(value) {
                window.location.host = value;
            },
            get hostname() {
                updateLocationObj();
                return locationObj.hostname;
            },
            set hostname(value) {
                window.location.hostname = value;
            },
            get port() {
                updateLocationObj();
                return locationObj.port;
            },
            set port(value) {
                window.location.port = value;
            },
            get pathname() {
                updateLocationObj();
                return locationObj.pathname;
            },
            set pathname(value) {
                window.location.pathname = value;
            },
            get search() {
                updateLocationObj();
                return locationObj.search;
            },
            set search(value) {
                window.location.search = value;
            },
            get hash() {
                updateLocationObj();
                return locationObj.hash;
            },
            set hash(value) {
                window.location.hash = value;
            },
            get origin() {
                updateLocationObj();
                return locationObj.origin;
            },
            assign(url) {
                window.location.assign(window._wb_wombat.rewriteUrl(url));
            },
            reload() {
                window.location.reload();
            },
            replace(url) {
                window.location.replace(window._wb_wombat.rewriteUrl(url));
            },
            toString() {
                updateLocationObj();
                return locationObj.href;
            }
        };
        Object.defineProperty(window, "currentLocation", {
            get: function () {
                return currentLocationProp;
            },
            set: function (value) {
                window.location = window._wb_wombat.rewriteUrl(value);
            },
        });
    }
})();