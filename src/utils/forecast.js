const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const KEY = "5ef98ae63ad9fd5a831d204be214c30f";
  // const location = "Trivandrum";
  // const URL = `http://api.weatherstack.com/current?access_key=${KEY}&query=${location}`; // units=f for F
  const URL = `http://api.weatherstack.com/current?access_key=${KEY}&query=${latitude},${longitude}`; // units=f for F

  request({ url: URL, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to Connect to the Weather API.");
    } else if (body.error) {
      callback("No Places Found with the Given Input!");
    } else {
      const data = body.current;
      callback(
        undefined,
        `${data.weather_descriptions[0]} It is Currently ${data.temperature} degress out in ${body.location.name},${body.location.country}! But it feels like ${data.feelslike} out.`
      );
    }
  });
};

module.exports = forecast;