const panicKey = document.querySelector('.container div .panicKey');

panicKey.addEventListener('input', (e) => {
    e.preventDefault();

    panicKey.addEventListener('keypress', (e) => {
        e.preventDefault();
    
        if (e.key === 'Enter') {
            const selectedKey = panicKey.value.trim() || ']';
    
            sessionStorage.setItem('panicKey', selectedKey);

            panicKey.addEventListener('keypress', (e) => {
                if (e.key === sessionStorage.getItem('panicKey')) {
                    
                }
            });
        }
    });
});