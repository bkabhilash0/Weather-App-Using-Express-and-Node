const request = require('request');

const geocode = (location,callback) => {
    location = encodeURIComponent(location);
    const API_KEY = "pk.eyJ1IjoiYmthYmhpbGFzaDEyMyIsImEiOiJja2s1NTZxZmMwMjNzMnBuNG4xOXVldWo5In0.KGEPLRO0sIda6U-hypaKgA";
    const URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${API_KEY}&limit=1`;
    
    request({url: URL,json: true},(error,{body}) => {
        if (error) {
            callback("Unable to Connect to Mapbox API");
          } else if (!body.features.length) {
            callback("No Place found with the Given Input!");
          } else {
            const location = body.features[0];
            const coordinates = location.geometry.coordinates;
            const name = location.place_name;
            const [longitude, latitude] = coordinates;
            callback(undefined,{
                name,
                longitude,
                latitude
            });
          }
    });
};

module.exports = geocode;