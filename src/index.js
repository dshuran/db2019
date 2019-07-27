import getCoordinatesFromAdresses from './adressesToMarkers.js'
import coordsToRoute from './route.js'
import {deployBubblesGroup} from './mapBubbles.js';

getCoordinatesFromAdresses(['Moscow', 'Minsk'])
    .then((result) => {
        deployBubblesGroup();
        coordsToRoute(result);
    });
// coordsToRoute([{lat: '0.5309916298853', lng: '0.5309916298853'}, {lat: '0.5409916298853', lng: '0.5309916298853'}])