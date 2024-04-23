const panicKey = document.querySelector('.container div .panicKey');
const urlToOpen = document.querySelector('.container div .urlToOpen');

window.addEventListener('load', () => {
    const p = localStorage.getItem('panicKey');

    if (p) {
        let hasFocus = false;

        window.addEventListener('keypress', (e) => {
            if (e.key === p) {
                const url = urlToOpen.value || 'https://myapps.classlink.com';

                if (url == '') {
                    alert('Please provide a valid URL');
                }

                window.location.href = url;

                if (!url.startsWith('https') || !url.startsWith('http') && url.match(/(https?:\/\/([-\w\.]+[-\w]){1,63}\.[a-zA-Z]{2,6}(\/[^\s]*)?)/g)) {
                    window.location.href = `https://${url}`;
                }
            }
        });

        panicKey.addEventListener('focus', () => {
            hasFocus = true;
        });

        panicKey.addEventListener('blur', () => {
            hasFocus = false;
        });

        urlToOpen.addEventListener('focus', () => {
            hasFocus = true;
        });

        urlToOpen.addEventListener('blur', () => {
            hasFocus = false;
        });
    }
});

panicKey.addEventListener('click', (e) => {
    e.preventDefault();

    panicKey.addEventListener('input', (e) => {
        e.preventDefault();

        panicKey.addEventListener('keypress', (e) => {
            e.preventDefault();

            if (e.key === 'Enter') {
                const selectedKey = panicKey.value.trim() || ']';

                localStorage.setItem('panicKey', selectedKey);

                window.addEventListener('keypress', (e) => {
                    if (e.key === localStorage.getItem('panicKey')) {
                        const url = urlToOpen.value || 'https://myapps.classlink.com';

                        if (url == '') {
                            alert("Please provide a valid URL");
                        }

                        window.location.href = url;

                        if (!url.startsWith('https') || !url.startsWith('http') && url.match(/(https?:\/\/([-\w\.]+[-\w]){1,63}\.[a-zA-Z]{2,6}(\/[^\s]*)?)/g)) {
                            window.location.href = `https://${url}`;
                        }
                    }
                });
            }
        });

        urlToOpen.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const selectedKey = panicKey.value.trim() || ']';

                localStorage.setItem('panicKey', selectedKey);

                window.addEventListener('keypress', (e) => {
                    if (e.key === localStorage.getItem('panicKey')) {
                        const url = urlToOpen.value || 'https://myapps.classlink.com';

                        if (url == '') {
                            alert("Please provide a valid URL");
                        }

                        window.location.href = url;

                        if (!url.startsWith('https') || !url.startsWith('http') && url.match(/(https?:\/\/([-\w\.]+[-\w]){1,63}\.[a-zA-Z]{2,6}(\/[^\s]*)?)/g)) {
                            window.location.href = `https://${url}`;
                        }
                    }
                });
            }
        });
    });
});