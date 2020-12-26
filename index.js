const TelegramBot = require("node-telegram-bot-api");
const token = "***";
const controller = require("./controller");
const keyNav = require("./keyboard/keyboard-buttons");
const keyboard = require("./keyboard/keyboard");
const helper = require("./helper");
const bot = new TelegramBot(token, {
  polling: {
    autoStart: true,
    params: {
      timeout: 10,
    },
  },
});

helper.logStart();

bot.onText(/\/start/, async (msg) => {
  await bot.sendMessage(helper.getChatId(msg), "Открываю клавиатуру...", {
    reply_markup: {
      keyboard: keyboard.mainMenu,
    },
  });

  bot.on("message", async (msg) => {
    try {
      console.log("Меня потрогал:", msg.from.first_name);
      const chatid = helper.getChatId(msg); //-------------------------- Стоит убрать

      //main menu switch
      switch (msg.text) {
        case keyNav.mainMenuB.view:
          await bot.sendMessage(chatid, "Меню клиентов", {
            parse_mode: "HTML",
            reply_markup: { keyboard: keyboard.selectMenuClient },
          });
          //Show all data base
          bot.on("message", async (msg) => {
            try {
              switch (msg.text) {
                case keyNav.selectMenuB.showAllDb:
                  await bot.sendMessage(chatid, await controller.outClients(), {
                    parse_mode: "HTML",
                  });
                  break;

                //Select by somesing switch
                // Selection by phone number
                case keyNav.selectMenuB.selectByNumber:
                  await bot.sendMessage(chatid, "ВЫБИРАЮ ПО НОМЕРУ", {
                    reply_markup: { keyboard: keyboard.cancelI },
                  });
                  bot.on("message", async (msg) => {
                    await bot.sendMessage(
                      chatid,
                      await controller.selectionByNumber(msg.text),
                      {
                        parse_mode: "HTML",
                      }
                    );
                  });
                  break;
                // Selection by name
                case keyNav.selectMenuB.selectByName:
                  await bot.sendMessage(chatid, "Имя", {
                    parse_mode: "HTML",
                  });
                  bot.on("message", async (msg) => {
                    await bot.sendMessage(
                      chatid,
                      await controller.selectionByName(msg.text),
                      {
                        parse_mode: "HTML",
                      }
                    );
                  });
                  break;
                // Edit function
                case keyNav.functionMenuB.change:
                  await bot.sendMessage(
                    chatid,
                    `Введите данные в формате:\nТелефон как идентификатор, Имя, Телефон\n\nПример: 380664620504, Алесандр, 380991234567`,
                    {
                      reply_markup: { keyboard: keyboard.cancelI },
                    }
                  );
                  bot.on("message", async (msg) => {
                    await bot.sendMessage(
                      chatid,
                      await controller
                        .editClient(msg)
                        .catch(
                          () =>
                            "ОШИБКА: Пользователь не найден / Неверный формат"
                        ),
                      {
                        parse_mode: "HTML",
                      }
                    );
                  });
                  break;
              }
            } catch (e) {
              console.error(e);
            }
          });
          break;

        //-----Add menu------//

        case keyNav.mainMenuB.add:
          await bot.sendMessage(chatid, `Добавить`, {
            reply_markup: { keyboard: keyboard.addMenu },
          });

          bot.on("message", async (msg) => {
            switch (msg.text) {
              case keyNav.addMenuB.client:
                await bot.sendMessage(
                  chatid,
                  "Введите данные в формате:\nИмя, Телефон\n\nЕвгений Павлович, 09856843515",
                  {
                    reply_markup: { keyboard: keyboard.cancelI },
                  }
                );
                bot.on("message", async (msg) => {
                  await bot.sendMessage(
                    chatid,
                    await controller
                      .addClient(msg)
                      .catch(
                        () => "Неверный формат/Клиент с таким номером есть"
                      ),
                    {
                      parse_mode: "HTML",
                    }
                  );
                });
                break;
              case keyNav.addMenuB.accounting:
                await bot.sendMessage(
                  chatid,
                  "Введите данные в формате:\nНомер клиента, Полная дата заезда, Полная дата выезда, Заметка\n\n380664620504, 26.12.2020, 27.12.2020, Чисто",
                  {
                    reply_markup: { keyboard: keyboard.cancelI },
                  }
                );
                bot.on("message", async (msg) => {
                  await bot.sendMessage(
                    chatid,
                    await controller
                      .addRecord(msg)
                      .catch(
                        () => "Неверный формат/Клиент с таким номером есть"
                      ),
                    {
                      parse_mode: "HTML",
                    }
                  );
                });
            }
          });
          break;
        case keyNav.cencelB.cancel:
          await bot.sendMessage(chatid, `Главное Меню`, {
            reply_markup: { keyboard: keyboard.mainMenu },
          });
          break;
      }
    } catch (e) {
      console.error(e);
    }
  });
});
