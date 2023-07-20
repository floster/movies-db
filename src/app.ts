const favoriteTogglers = document.querySelectorAll('.favorite-toggle');
const appAlert = document.querySelector('.app-alert') as HTMLElement;
const appAlertCloseBtn = document.querySelector('.app-alert__close') as HTMLElement;

/**
 * Opens the app alert
 * @param {boolean} delayedClose - true if need to close the alert after a delay of 3 seconds.
 * @returns {void}
 */
function appAlertOpen(delayedClose = false) {
    appAlert.classList.remove('is-close');
    appAlert.classList.add('is-open');

    if (delayedClose) {
        setTimeout(() => {
            appAlertClose();
        }, 3000);
    }
}

function appAlertClose() {
    appAlert.classList.remove('is-open');
    appAlert.classList.add('is-close');
}

appAlertCloseBtn.addEventListener('click', appAlertClose);

favoriteTogglers.forEach((toggler) => {
    toggler.addEventListener('click', _ => {
        appAlertOpen(true);
    });
});

