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

const reqOnDb = (sqlreq) => {
  connection.query(sqlreq, (err, result) => {
    if (err) console.log("Ошибочка " + err);
    console.log(result);
  });
};

const db = {};

db.reqOnDb = reqOnDb;
db.connection = connection;

module.exports = db;
