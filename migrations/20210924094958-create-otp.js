'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('otp', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      otp: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      service: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      retry_count: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('otp');
  }
};
