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

  checkEditClient(msg) {
    if (msg.text === "Главное меню") return "Главное меню";
    let client;
    if (!!msg.text) {
      let arr = msg.text.split(",");

      if (
        arr.length < 3 ||
        arr.length > 3 ||
        isNaN(+arr[0]) ||
        isNaN(+arr[2])
      ) {
        return "Неверный формат";
      } else {
        client = {
          id_num: +arr[0],
          name: arr[1],
          phone: +arr[2],
        };
        return client;
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
