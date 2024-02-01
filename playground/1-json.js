const fs = require("fs");

const jsonData = fs.readFileSync("1-json.json", "utf-8");
const data = JSON.parse(jsonData);

data.name = "Abhi";
data.age = 21;

const writeJsonData = JSON.stringify(data);
fs.writeFileSync("1-json.json", writeJsonData);

// console.log(data);
