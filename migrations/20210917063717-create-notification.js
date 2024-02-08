'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('notifications', {
      id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      type: {
        type: DataTypes.ENUM(
          'EMAIL',
          'SMS'
        ),
        allowNull: false
      },
      username: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      content: {
        type: DataTypes.JSON,
        allowNull: false
      },
      is_scheduled: {
        type: DataTypes.ENUM(
          'YES',
          'NO'
        ),
      },
      schedule_time: {
        type: DataTypes.DATE,
        defaultValue: null
      },
      status: {
        type: DataTypes.ENUM(
          'PENDING',
          'SENT',
          'FAILED',
        ),
        defaultValue: 'PENDING'
      },
      sent_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('notifications');
  }
};