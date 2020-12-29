const mysql = require("mysql");
const db = require("./db");
const helper = require("./helper");

//Out all DB
exports.outClients = () => {
  return new Promise((resolve, reject) =>
    db.connection.query("SELECT * FROM client", (error, result) => {
      if (error) {
        reject(error);
      } else {
        const clients = result
          .map((i, l) => {
            return `<b>Имя:</b> ${i.name}\n<b>Телефон:</b> ${i.phone_number}\n`;
          })
          .join("\n");
        resolve(clients);
      }
    })
  );
};

// Selection by phone
exports.selectionByNumber = async (phone_number) => {
  return new Promise((resolve, reject) => {
    if (phone_number === "Главное меню") return false;
    if (isNaN(phone_number)) {
      resolve("Такого клиента нет");
    } else {
      db.connection.query(
        `SELECT * from client WHERE phone_number LIKE '%${phone_number}%'`,
        (error, result) => {
          if (error) {
            reject(error);
          } else if (result.length === 0) {
            resolve("Совпадений не найдено");
          } else {
            console.log(result);
            const selection = result
              .map((i, l) => {
                return `<b>Имя:</b> ${i.name}\n<b>Телефон:</b> ${i.phone_number}\n`;
              })
              .join("\n");
            resolve(selection);
          }
        }
      );
    }
  });
};

// selection by name
exports.selectionByName = async (name) => {
  return new Promise((resolve, reject) => {
    if (name === "Главное меню") return false;
    db.connection.query(
      `SELECT * from client WHERE name LIKE '%${name}%'`,
      (error, result) => {
        if (error) {
          reject(error);
        } else if (result.length === 0) {
          resolve("Совпадений не найдено");
        } else {
          console.log(result);
          const selection = result
            .map((i) => {
              return `<b>Имя:</b> ${i.name}\n<b>Телефон:</b> ${i.phone_number}\n`;
            })
            .join("\n");
          console.log(typeof selection, selection);
          resolve(selection);
        }
      }
    );
  });
};

// Edit client
exports.editClient = async (msg) => {
  if (msg === "Главное меню") return "Выхожу";
  const value = helper.checkEditClient(msg);
  return new Promise((resolve, reject) => {
    if (value === "Неверный формат") {
      reject();
    } else {
      db.connection.query(
        `UPDATE client set phone_number = '${value.phone}', name = '${value.name}' WHERE phone_number ='${value.id_num}'`,
        (error, result) => {
          if (error) {
            console.log(error);
            reject();
          } else {
            console.log(result);
            resolve("Успешно");
          }
        }
      );
    }
  });
};

exports.addClient = async (msg) => {
  if (msg === "Главное меню") return "Выхожу";
  const value = helper.checkAddClient(msg);
  return new Promise((resolve, reject) => {
    if (value === "Неверный формат") {
      reject();
    } else {
      db.connection.query(
        `INSERT INTO client(name, phone_number) VALUES ('${value.name}', ${value.phone})`,
        (error, result) => {
          if (error) {
            console.log(error);
            reject();
          } else {
            console.log(result);
            resolve("Успешно");
          }
        }
      );
    }
  });
};

exports.addRecord = async (msg) => {
  if (msg === "Главное меню") return "Выхожу";
  const value = helper.checkAddRecord(msg);
  console.log(value);
  return new Promise((resolve, reject) => {
    if (value === "Неверный формат") reject();
    db.connection.query(
      `SELECT * FROM client WHERE phone_number = ${value.id}`,
      (error, result) => {
        if (error || result.length === 0) {
          console.log(result, error, "<-----SQL--*");
          reject();
        } else {
          console.log(result);
          db.connection.query(
            `INSERT INTO record (id, date_in, date_out, description) VALUES ('${value.id}','${value.dateIn}','${value.dateOut}','${value.description}')`,
            (error, result) => {
              if (error) return reject();

              console.log(result);
              resolve("Успешно");
            }
          );
        }
      }
    );
  });
};
