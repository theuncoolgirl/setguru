'use strict';

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Setlists', [
      r({ userId: 1, setListId: '139b394d', comments: "I love this setlist.", isStarred: true }),
      r({ userId: 1, setListId: '139b394d', comments: "Here is another setlist", isStarred: false }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Setlists');
  }
};