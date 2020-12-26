const keyNav = require("./keyboard-buttons");

module.exports = {
  mainMenu: [[keyNav.mainMenuB.add, keyNav.mainMenuB.view]],
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
    [keyNav.selectMenuB.selectByDateIn, keyNav.selectMenuB.selectByDateOut],
    [
      keyNav.selectionMenuB.selectByNumber,
      keyNav.selectionMenuB.selectByDateIn,
      keyNav.selectionMenuB.selectByDateOut,
    ],
    [keyNav.cencelB.cancel],
  ],
  cancelI: [[keyNav.cencelB.cancel]],
};
