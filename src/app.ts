// const favoriteTogglers = document.querySelectorAll('.app-favorite');
// const appAlert = document.querySelector('.app-alert') as HTMLElement;
// const appAlertCloseBtn = document.querySelector('.app-alert__close') as HTMLButtonElement;

// const searchDialog = document.querySelector('.search-dialog') as HTMLDialogElement;
// const openSearchDialogBtn = document.querySelector('.open-search') as HTMLButtonElement;

const mediaHeroPlaceholder = document.querySelector('.media-hero__placeholder') as HTMLDivElement;
const mediaHeroInner = document.querySelector('.media-hero__inner') as HTMLDivElement;

/**
 * Opens the app alert
 * @param {boolean} delayedClose - true if need to close the alert after a delay of 3 seconds.
 * @returns {void}
 */
// function appAlertOpen(delayedClose = false) {
//     appAlert.classList.remove('is-close');
//     appAlert.classList.add('is-open');

//     if (delayedClose) {
//         setTimeout(() => {
//             appAlertClose();
//         }, 3000);
//     }
// }

// function appAlertClose() {
//     appAlert.classList.remove('is-open');
//     appAlert.classList.add('is-close');
// }

// appAlertCloseBtn.addEventListener('click', appAlertClose);

// favoriteTogglers.forEach((toggler) => {
//     toggler.addEventListener('click', _ => {
//         appAlertOpen(true);
//     });
// });

// openSearchDialogBtn.addEventListener('click', _ => {
//     searchDialog.showModal();
// });

// close dialog by clicking on the backdrop
// searchDialog.addEventListener('click', (event) => {
//     const target = event.target as HTMLElement;
//     if (target.nodeName === 'DIALOG') {
//         searchDialog.close();
//     }
// });

// dummy show placeholder then content for media-hero
setTimeout(() => {
    mediaHeroPlaceholder.classList.add('is-hidden');
    mediaHeroInner.classList.remove('is-hidden');
}, 3000);