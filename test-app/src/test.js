const rail = require("indian-rail-api").default;

rail.getTrainInformation(19034, (r) => {
  const json = JSON.parse(r);
  console.log(json);
});
