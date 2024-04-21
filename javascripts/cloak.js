const panicKey = document.querySelector('.container div .panicKey');
const urlToOpen = document.querySelector('.container div .urlToOpen');

panicKey.addEventListener('click', (e) => {
    e.preventDefault();

    const p = prompt("Do you want these settings to last throughout multiple sessions [yes/no]");

    if (p === 'yes') {
        panicKey.addEventListener('input', (e) => {
            e.preventDefault();
        
            panicKey.addEventListener('keypress', (e) => {
                e.preventDefault();
            
                if (e.key === 'Enter') {
                    const selectedKey = panicKey.value.trim() || ']';
            
                    localStorage.setItem('panicKey', selectedKey);
        
                    panicKey.addEventListener('keypress', (e) => {
                        if (e.key === localStorage.getItem('panicKey')) {
                            const url = urlToOpen.value;

                            if (url == '' || !url.startsWith('https') || !url.startsWith('http')) {
                                alert("Please provide a valid URL");
                            }

                            
                        }
                    });
                }
            });
        });
    }
});