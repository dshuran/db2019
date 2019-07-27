// Define a callback function to process the routing response:
var onResult = function(resCallback, result) {
    var route,
        routeLine,
        routeShape,
        markers = [],
        linestring;
    if(result.response.route) {
        // Pick the first route from the response:
        route = result.response.route[0];
        // Pick the route's shape:
        routeShape = route.shape;

        // Create a linestring to use as a point source for the route line
        linestring = new H.geo.LineString();

        // Push all the points in the shape into the linestring:
        routeShape.forEach(function(point) {
            var parts = point.split(',');
            linestring.pushLatLngAlt(parts[0], parts[1]);
        });

        route.waypoint.forEach(({mappedPosition}) => {
            markers.push(new H.map.Marker({
                lat: mappedPosition.latitude,
                lng: mappedPosition.longitude
            }));
        });

        routeLine = new H.map.Polyline(linestring, {
            style: { strokeColor: 'blue', lineWidth: 3 }
        });

        map.addObjects([routeLine, ...markers]);
        map.getViewModel().setLookAtData({bounds: routeLine.getBoundingBox()});

        resCallback(true);
    }

    resCallback(false);
};

// Get an instance of the routing service:
var router = platform.getRoutingService();


function coordsToRoute(coords) {
    return new Promise((res, rej) => {
        var routingParameters = {
            // The routing mode:
            'mode': 'fastest;car',
            // The start point of the route:
    /*        'waypoint0': 'geo!50.1120423728813,8.68340740740811',
            // The end point of the route:
            'waypoint1': 'geo!50.5309916298853,8.3846220493377',
            'waypoint2': 'geo!50.4009916298853,8.5846220493377',*/
            // To retrieve the shape of the route we choose the route
            // representation mode 'display'
            'representation': 'display'
        };

        coords.forEach(({lat, lng}, ind) => {
            routingParameters[`waypoint${ind}`] = `geo!${lat},${lng}`;
        });
        // Create the parameters for the routing request:

        router.calculateRoute(routingParameters, onResult.bind(null, res),
            function(error) {
                console.error(error.message);
            });
    })
}

export default coordsToRoute;