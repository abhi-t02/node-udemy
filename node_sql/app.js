const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
});

conn.connect((err) => {
  console.log(err);
});
