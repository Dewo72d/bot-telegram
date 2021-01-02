const keyNav = require("./keyboard-buttons");

module.exports = {
  mainMenu: [
    [
      keyNav.mainMenuB.viewClient,
      keyNav.mainMenuB.viewRecord,
      keyNav.mainMenuB.add,
    ],
  ],
  addMenu: [
    [keyNav.addMenuB.accounting, keyNav.addMenuB.client],
    [keyNav.cencelB.cancel],
  ],
  viewMenu: [
    [keyNav.viewMenuB.accounting, keyNav.viewMenuB.client],
    [keyNav.cencelB.cancel],
  ],
  selectMenuClient: [
    [keyNav.selectMenuB.showAllDb],
    [keyNav.selectMenuB.selectByNumber, keyNav.selectMenuB.selectByName],
    [keyNav.functionMenuB.change],
    [keyNav.cencelB.cancel],
  ],
  selectMenuAcounting: [
    [keyNav.selectMenuB.showAllRecordDb],
    [keyNav.selectMenuB.selectByDate, keyNav.selectMenuB.selectByNumber],
    [keyNav.functionMenuB.change],
    [keyNav.cencelB.cancel],
  ],
  cancelI: [[keyNav.cencelB.cancel]],
};
