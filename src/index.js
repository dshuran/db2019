import getCoordinatesFromAdresses from './adressesToMarkers.js'
import coordsToRoute from './route.js'
import {deployBubblesGroup} from './mapBubbles.js';
import getBestSequence from '../waypointSequence.js';

getCoordinatesFromAdresses(['Москва,ул.старый арбат, д 10 ', 'Paris', 'Berlin', 'Minsk'])
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