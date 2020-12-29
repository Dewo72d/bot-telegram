const mysql = require("mysql");
const dbconfig = require("./dbConfig");

const connection = mysql.createConnection({
  host: dbconfig.host,
  user: dbconfig.user,
  password: dbconfig.password,
  database: dbconfig.database,
});

connection.connect((err) => {
  if (err) throw error;
  console.log("Connected");
});

const db = {};
db.connection = connection;

module.exports = db;
