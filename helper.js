const mysql = require("mysql");
const db = require("./db");

module.exports = {
  logStart() {
    console.log("|*|*|*--- I AM ALIVE ---*|*|*|");
  },

  getChatId(msg) {
    return msg.chat.id;
  },

  getText(msg) {
    return msg.chat.text;
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
};
