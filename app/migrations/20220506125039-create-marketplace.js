'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Marketplaces', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_alamat_marketplace: {
        type: Sequelize.INTEGER
      },
      whatsapp: {
        type: Sequelize.STRING
      },
      facebook: {
        type: Sequelize.STRING
      },
      shopee: {
        type: Sequelize.STRING
      },
      tokopedia: {
        type: Sequelize.STRING
      },
      bukalapak: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Marketplaces');
  }
};