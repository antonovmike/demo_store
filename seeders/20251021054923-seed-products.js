'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Products', [
      {
        name: 'Table',
        price: 99.99,
        description: 'A sturdy wooden table.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Chair',
        price: 49.99,
        description: 'A comfortable chair.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Products', null, {});
  },
};