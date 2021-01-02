const mysql = require("mysql");
const db = require("./db");

function checkDate(inD, outD) {
  const regExp = /(\d{1,2})\.(\d{1,2}).(\d{4})/;

  if (regExp.test(inD, outD) === false) return false;

  let [, dSI, mSI, ySI] = regExp.exec(inD);
  let [, dSO, mSO, ySO] = regExp.exec(outD);
  let [dI, mI, yI] = [dSI, mSI, ySI].map((e) => +e);
  let [dO, mO, yO] = [dSO, mSO, ySO].map((e) => +e);

  let dateIn = `${yI}.${mI}.${dI}`;
  let dateOut = `${yO}.${mO}.${dO}`;
  let checkI = new Date(dateIn);
  let checkO = new Date(dateOut);
  if (checkI == "Invalid Date" || checkO == "Invalide Date") return false;

  let value = [dateIn, dateOut];

  return value;
}

module.exports = {
  logStart() {
    console.log("|*|*|*--- I AM ALIVE ---*|*|*|");
  },

  getChatId(msg) {
    return msg.chat.id;
  },

  getMaxId() {
    return new Promise((resolve, reject) =>
      db.connection.query("SELECT MAX(id) from client", (error, result) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          const maxId = result.map((arr) => {
            return arr["MAX(id)"];
          });
          resolve(+maxId);
        }
      })
    );
  },

  checkEditClient(msg, caseName) {
    if (msg === "Главное меню") return "Главное меню";
    if (typeof msg != undefined) {
      switch (caseName) {
        case "client":
          let client;
          let arrClient = msg.split(",");

          if (arrClient.length != 2 || !Number(arrClient[0])) {
            return "Неверный формат";
          } else {
            client = {
              id_num: +arrClient[0],
              name: arrClient[1],
            };
            return client;
          }
        case "record":
          let record;
          let arrRecord = msg.split(",");
          let date = checkDate(arrRecord[1], arrRecord[2]);
          console.log(date[1], "<--------date");

          if (
            arrRecord.length < 4 ||
            arrRecord.length > 4 ||
            date[0] === undefined ||
            date[1] === undefined ||
            date === false
          ) {
            console.log("error");
            return "Неверный формат";
          } else {
            record = {
              id_num: +arrRecord[0],
              date_in: date[0],
              date_out: date[1],
              dascription: arrRecord[3],
            };
            return record;
          }
      }
    } else return "Неверный формат";
  },

  checkAddClient(msg) {
    if (msg.text === "Главное меню") return "Главное меню";
    let client;
    if (!!msg.text) {
      let arr = msg.text.split(",");

      if (arr.length < 2 || arr.length > 2 || isNaN(+arr[1])) {
        return "Неверный формат";
      } else {
        client = {
          name: arr[0],
          phone: +arr[1],
        };
        return client;
      }
    } else return "Неверный формат";
  },

  checkAddRecord(msg) {
    if (msg.text === "Главное меню") return "Главное меню";

    let record;
    if (!!msg.text) {
      let arr = msg.text.split(",");
      let date = checkDate(arr[1], arr[2]);

      if (
        arr.length < 3 ||
        arr.length > 4 ||
        isNaN(+arr[0]) ||
        date[0] === undefined ||
        date[1] === undefined ||
        date === false
      ) {
        return "Неверный формат";
      } else {
        record = {
          id: arr[0],
          dateIn: date[0],
          dateOut: date[1],
          description: arr[3],
        };
        console.log(record, "<-----record--*");
        return record;
      }
    } else return "Неверный формат";
  },
};
