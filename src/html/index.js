/*import getCoordinatesFromAdresses from './adressesToMarkers.js'
import coordsToRoute from './route.js'*/

const orderTmp = document.querySelector('#orderTmpId').content;
const ordersTbody = document.querySelector('#ordersTbodyId');
const demoQrCode = document.querySelector('#demoQrCode');

function showDemoQrCode(callback) {
    demoQrCode.style.display = 'flex';

    setTimeout(() => {
        demoQrCode.style.opacity = 0.6;
        setTimeout(() => {
            demoQrCode.style.opacity = 0;
        }, 2000);
    }, 0);

    setTimeout(() => {
        demoQrCode.style.display = 'none';
        // overlay
        callback();
    }, 4000)
}

function setBtnListener() {
    const addOrderBtn = document.querySelector('#addOrderBtn');

    addOrderBtn.addEventListener('click', function(e) {
        //TODO get-запрос на сервер
        showDemoQrCode(() => {appendData('г. Москва, ул. Красного Маяка, дом 8, к.2, п-д 4, кв. 157', '18:00 - 20:00')})
    })
}

function appendData(title = '', time = '') {
    orderTmp.querySelector('.orderTitle').textContent = title;
    orderTmp.querySelector('.orderTime').textContent = time;

    ordersTbody.appendChild(document.importNode(orderTmp, true));
}

setBtnListener();
appendData('г. Москва, ул. Нагорная, дом 17, п-д 2, кв. 132', '12:00 - 14:00');
appendData('г. Москва, ул. Нагатинская, дом 12, п-д 2, кв. 94', '14:00 - 16:00');
appendData('г. Москва, Даниловская наб., дом 6, п-д 4, кв. 94', '16:00 - 18:00');

/*getCoordinatesFromAdresses(['Moscow', 'Minsk'])
    .then(coordsToRoute)*/

