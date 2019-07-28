
/*
    adresses - массив объектов типа T
    T = {
        searchText: 'SomeAdress'
    }
*/

/* adresses = string[] */
function getCoordinatesFromAdresses(adresses)
{
    let adressObjects = [];
    for(let adress of adresses)
    {
        adressObjects.push({
            searchText: adress
        });
    }

    return new Promise((resolve, reject) => {
        getCoordinatesFromAdressObjects(adressObjects, resolve);
    })
}

/* adressObjects = T[], где T = {searchText: 'someAdress'} */
function getCoordinatesFromAdressObjects(adressObjects, resolve)
{
    let promise = new Promise((res, reject) => 
    {
        for (let i = 0; i < adressObjects.length; i++)
        {
            let geocodingParams = adressObjects[i];
            // Get an instance of the geocoding service:
            let geocoder = platform.getGeocodingService();

            // Call the geocode method with the geocoding parameters,
            // the callback and an error callback function (called if a
            // communication error occurs):
            geocoder.geocode(geocodingParams, onResult.bind(null, res, (adressObjects.length - 1) === i), function(e) {
                alert(e);
            });
        }
    }).then(() => {
        resolve(locationResults);
    });
}

let locationResults = [];

// Define a callback function to process the geocoding response:
var onResult = function(resolve, last, result) 
{
    let locations = result.Response.View[0].Result;
    let position = {};

    for(let i = 0; i < locations.length; i++)
    {
        position = {
            lat: locations[i].Location.DisplayPosition.Latitude,
            lng: locations[i].Location.DisplayPosition.Longitude
        };
        locationResults.push(position);
    }
    if(last === true) {
        resolve();
    }
};

export default getCoordinatesFromAdresses;