const yargs = require("yargs");

const { geoCode } = require("./utils/geoCode.js");
const { forecast } = require("./utils/forecast.js");
const test = require("./utils/test.js");

yargs
  .command(
    "forecast",
    "To find forecast for given place",
    (yargs) => {
      yargs.option("name", {
        type: "string",
        demandOption: true,
        describe: "Place name required.",
      });
    },
    (argv) => {
      geoCode(argv.name, (err, coords) => {
        if (err) console.log(err);
        const { latitude, longitude, location } = coords;

        forecast(latitude, longitude, (err, forecastData) => {
          if (err) console.log(err);

          console.log(forecastData);
        });
      });
    }
  )
  .help().argv;
