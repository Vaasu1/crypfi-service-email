import { Sequelize, Model, DataTypes, INTEGER } from 'sequelize';

class Notification extends Model {
  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.BIGINT,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        user_id:{
          type:DataTypes.INTEGER,
          allowNull:false

        },
        type: {
          type: DataTypes.ENUM('EMAIL', 'SMS'),
          allowNull: true
        },
        username: {
          type: DataTypes.STRING(45),
          allowNull: true
        },
        title:{
          type: DataTypes.STRING(45),
          allowNull: true
        },
        description:{
          type: DataTypes.STRING(45),
          allowNull: true
        },
        notification_type:{
          type: DataTypes.INTEGER,
          allowNull: false
        },
        content: {
          type: DataTypes.JSON,
          allowNull: true
        },
        is_scheduled: {
          type: DataTypes.ENUM('YES', 'NO')
        },
        schedule_time: {
          type: DataTypes.DATE,
          defaultValue: null
        },
        status: {
          type: DataTypes.ENUM('PENDING', 'SENT', 'FAILED'),
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
      },
      {
        sequelize,
        modelName: 'notification',
        timestamps: false
        // freezeTableName: true
      }
    );
  }
}
export default Notification;
