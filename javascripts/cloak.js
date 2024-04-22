const panicKey = document.querySelector('.container div .panicKey');
const urlToOpen = document.querySelector('.container div .urlToOpen');

panicKey.addEventListener('click', (e) => {
    e.preventDefault();

    panicKey.addEventListener('input', (e) => {
        e.preventDefault();

        panicKey.addEventListener('keypress', (e) => {
            e.preventDefault();

            if (e.key === 'Enter') {
                const selectedKey = panicKey.value.trim() || ']';

                sessionStorage.setItem('panicKey', selectedKey);

                window.addEventListener('keypress', (e) => {
                    if (e.key === sessionStorage.getItem('panicKey')) {
                        const url = urlToOpen.value || 'https://myapps.classlink.com';

                        if (url == '') {
                            alert("Please provide a valid URL");
                        }

                        window.location.replace(url);

                        if (!url.startsWith('https') || !url.startsWith('http') && url.match(/(https?:\/\/([-\w\.]+[-\w]){1,63}\.[a-zA-Z]{2,6}(\/[^\s]*)?)/g)) {
                            window.location.replace(`https://${url}`);
                        }
                    }
                });
            }
        });

        urlToOpen.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const selectedKey = panicKey.value.trim() || ']';

                sessionStorage.setItem('panicKey', selectedKey);

                window.addEventListener('keypress', (e) => {
                    if (e.key === sessionStorage.getItem('panicKey')) {
                        const url = urlToOpen.value || 'https://myapps.classlink.com';

                        if (url == '') {
                            alert("Please provide a valid URL");
                        }

                        window.location.replace(url);

                        if (!url.startsWith('https') || !url.startsWith('http') && url.match(/(https?:\/\/([-\w\.]+[-\w]){1,63}\.[a-zA-Z]{2,6}(\/[^\s]*)?)/g)) {
                            window.location.replace(`https://${url}`);
                        }
                    }
                });
            }
        });
    });
});