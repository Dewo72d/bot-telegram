const mysql = require("mysql");
const db = require("./db");
const helper = require("./helper");

// Out all clients
exports.outClients = async () => {
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

// Out all Records
exports.outRecords = () => {
  return new Promise((resolve, reject) =>
    db.connection.query(
      "SELECT * FROM record LEFT OUTER JOIN client ON client.phone_number = record.id",
      (error, result) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          const clients = result
            .map((i, l) => {
              return `<b>Имя:</b> ${i.name}\n<b>Телефон:</b> ${
                i.phone_number
              }\n<b>Заезд:</b> ${new Date(
                i.date_in
              ).toLocaleDateString()}\n<b>Выезд:</b> ${new Date(
                i.date_out
              ).toLocaleDateString()}\n<b>Описание:</b> ${
                i.description
              }\n<b>id:</b> ${i.counter}\n\n`;
            })
            .join("\n");
          resolve(clients);
        }
      }
    )
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

// Selection by date in record
exports.selectionByDate = async (date) => {
  return new Promise((resolve, reject) => {
    if (date.text === "Главное меню") return false;
    db.connection.query(
      `SELECT DATE(date_in), id, date_out, description FROM record  WHERE date_in  LIKE '%${date.text}%' OR date_out LIKE '%${date.text}%'`,
      (error, result) => {
        if (error) {
          console.log(error);
          reject(error);
        } else if (result.length === 0) {
          resolve("Совпадений не найдено");
        } else {
          console.log(result);
          const selection = result
            .map((i) => {
              return `<b>Телефон:</b> ${i.id}\n<b>Заезд:</b> ${new Date(
                i["DATE(date_in)"]
              ).toLocaleDateString()}\n<b>Выезд:</b> ${new Date(
                i.date_out
              ).toLocaleDateString()}\n<b>Описание:</b> ${i.description}\n`;
            })
            .join("\n");
          console.log(typeof selection, selection);
          resolve(selection);
        }
      }
    );
  });
};

// Selection by phone in record
exports.selectionRecordByNumber = async (phone_number) => {
  return new Promise((resolve, reject) => {
    if (phone_number === "Главное меню") return false;
    if (isNaN(phone_number)) {
      resolve("Такого клиента нет");
    } else {
      db.connection.query(
        `SELECT * from record WHERE id LIKE '%${phone_number}%'`,
        (error, result) => {
          if (error) {
            console.log(error);
            reject(error);
          } else if (result.length === 0) {
            resolve("Совпадений не найдено");
          } else {
            console.log(result);
            const selection = result
              .map((i, l) => {
                return `<b>Телефон:</b> ${i.id}\n<b>Заезд:</b> ${new Date(
                  i.date_in
                ).toLocaleDateString()}\n<b>Выезд:</b> ${new Date(
                  i.date_out
                ).toLocaleDateString()}\n<b>Описание:</b> ${i.description}\n`;
              })
              .join("\n");
            console.log(selection);
            resolve(selection);
          }
        }
      );
    }
  });
};

// Edit client
exports.editClient = async (msg) => {
  const value = helper.checkEditClient(msg.text, "client");

  return new Promise((resolve, reject) => {
    if (value === "Неверный формат") {
      reject();
    } else {
      if (value === "Главное меню") {
        resolve("Успешно..");
      } else {
        db.connection.query(
          `UPDATE client SET name = '${value.name}' WHERE phone_number ='${value.id_num}'`,
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
    }
  });
};

// Edit Record
exports.editRecord = async (msg) => {
  const value = helper.checkEditClient(msg.text, "record");
  return new Promise((resolve, reject) => {
    if (value === "Неверный формат") {
      console.log(value, "error");
      reject();
    } else {
      if (value === "Главное меню") {
        resolve("Успешно..");
      } else {
        console.log(value);
        db.connection.query(
          `UPDATE record SET date_in = '${value.date_in}', date_out = '${value.date_out}', description = '${value.dascription}' WHERE id = '${value.id_num}'`,
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
    }
  });
};

// Add client
exports.addClient = async (msg) => {
  const value = helper.checkAddClient(msg);
  return new Promise((resolve, reject) => {
    if (value === "Неверный формат") {
      reject();
    } else {
      if (value === "Главное меню") {
        resolve("Успешно..");
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
    }
  });
};

// Add record
exports.addRecord = async (msg) => {
  const value = helper.checkAddRecord(msg);
  console.log(value);
  return new Promise((resolve, reject) => {
    if (value === "Неверный формат") reject();
    if (value === "Главное меню") {
      resolve("Успешно..");
    } else {
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
    }
  });
};

// Delete record
exports.deleteRecord = async (msg) => {
  return new Promise((resolve, reject) => {
    db.connection.query(
      `DELETE FROM record WHERE counter = '${msg}'`,
      (error, result) => {
        if (error || result.length === 0) {
          console.log(result, error, "<-----SQL--*");
          return reject();
        } else {
          resolve("Успешно");
        }
      }
    );
  });
};

// Delete user and all they records
exports.deleteClient = async (msg) => {
  console.log(msg);
  return new Promise((resolve, reject) => {
    if (!Number(msg) || msg.length < 10) return reject();
    db.connection.query(
      `SELECT * FROM record WHERE id = '${msg}'`,
      (error, result) => {
        if (error) {
          console.log(error, "<---------*");
          reject();
        } else if (result.length === 0) {
          db.connection.query(
            `DELETE FROM client WHERE phone_number = '${msg}'`,
            (error, result) => {
              if (error) {
                console.log(error);
                return reject();
              } else {
                resolve("Успешно");
              }
            }
          );
        } else {
          db.connection.query(
            `DELETE FROM record WHERE id = '${msg}'`,
            (erorr, result) => {
              if (erorr) {
                console.log(error);
                return reject();
              } else {
                db.connection.query(
                  `DELETE FROM client WHERE phone_number = '${msg}'`,
                  (error, result) => {
                    if (error) {
                      console.log(error);
                      return reject();
                    } else {
                      resolve("Успешно");
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  });
};
