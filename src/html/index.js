import getCoordinatesFromAdresses from './adressesToMarkers.js'
import coordsToRoute from './route.js'
import {deployBubblesGroup} from './mapBubbles.js';
import getBestSequence from './waypointSequence.js';

getCoordinatesFromAdresses(['г. Москва, ул. Нагорная, дом 17', 'г. Москва, ул. Нагатинская, дом 12'])
    .then((result) => {
        deployBubblesGroup();
        console.log(result.length);
        return getBestSequence(result);
    }).then((res) => {
    let rightCords = [];
    for (let obj of res.results[0].waypoints)
    {
        let lat = obj.lat;
        let lng = obj.lng;
        rightCords.push({lat, lng});
    }
    coordsToRoute(rightCords);
})
// coordsToRoute([{lat: '0.5309916298853', lng: '0.5309916298853'}, {lat: '0.5409916298853', lng: '0.5309916298853'}])

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

        document.getElementById('map').style.display = 'none';
        document.getElementById('map2').style.display = 'block';
        var defaultLayers = platform.createDefaultLayers({'lg':'RU'});
        var map = new H.Map(
            document.getElementById('map2'),
            defaultLayers.vector.normal.map,
            {
                zoom: 10,
                center: { lat: 55.45, lng: 37.37 }
            });
        var mapEvents = new H.mapevents.MapEvents(map);
        var behavior = new H.mapevents.Behavior(mapEvents);

        window.addEventListener('resize', () => map.getViewPort().resize());

        // create default UI with layers provided by the platform
        var ui = H.ui.UI.createDefault(map, defaultLayers);
        getCoordinatesFromAdresses(['г. Москва, ул. Нагорная, дом 17', 'г. Москва, ул. Нагатинская, дом 12', 'г. Москва, ул. Красного Маяка, дом 8'])
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

/*getCoordinatesFromAdresses(['Moscow', 'Minsk'])
    .then(coordsToRoute)*/

