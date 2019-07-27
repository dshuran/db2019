import getCoordinatesFromAdresses from './adressesToMarkers.js'
import coordsToRoute from './route.js'
import addInfoBubble from './mapBubbles.js';

getCoordinatesFromAdresses(['Moscow', 'Minsk'])
    .then(coordsToRoute)
    .then(() => 
    {
        addInfoBubble(map);
    })
// coordsToRoute([{lat: '0.5309916298853', lng: '0.5309916298853'}, {lat: '0.5409916298853', lng: '0.5309916298853'}])