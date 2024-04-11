// EXPIRED!

/* const frame = document.querySelector('iframe.frame');
const corsUrl = 'https://api.codetabs.com/v1/proxy/?quest=';

export function frameLoad(url) {
    fetch(corsUrl + url, {
        mode: 'cors',
        method: 'GET'
    })
    .then((res) => {
        if (!(res.ok)) throw Error(`Unable to find a match: ${res.status}`);
        return res.text();
    })
    .then((data) => {
        const parser = new DOMParser(),
              htmlDoc = parser.parseFromString(data, 'text/html');

        htmlDoc.head.innerHTML += '<base href="https://www.google.com/">';

        frame.srcdoc = htmlDoc;
    })
    .catch((err) => (console.error(err), []));
}; */