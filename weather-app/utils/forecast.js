const request = require("request");

// Weather API
const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}&query=${latitude},${longitude}`;

  debugger;
  request({ url, json: true }, (err, { body }) => {
    debugger;
    if (err) callback(err.message, undefined);
    if (body.error) callback("unable to find location", undefined);
    const data = body.current;
    callback(
      undefined,
      `${data.weather_descriptions[0]}. It is currently ${data.temperature} degrees out, there is ${data.cloudcover}% chance of rain.`
    );
  });
};

module.exports = { forecast };
