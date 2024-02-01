const request = require("request");

// Geo coding API
const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${process.env.MAPBOX_API_KEY} `;
  request({ url, json: true }, (err, res) => {
    if (err) callback(err.message, undefined);
    if (res.body.features.length === 0) {
      callback(`No search result found for query.`, undefined);
    }

    callback(undefined, {
      latitude: res.body.features[0].center[1],
      longitude: res.body.features[0].center[0],
      location: res.body.features[0].place_name,
    });
  });
};

module.exports = { geoCode };
