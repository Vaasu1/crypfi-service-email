import { Sequelize, Model, DataTypes } from 'sequelize';

class Otp extends Model {
  public static initialize(sequelize: Sequelize) {
    this.init(
      {
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
      },
      {
        sequelize,
        modelName: 'otp',
        timestamps: false,
        freezeTableName: true
      }
    );
  }
}
export default Otp;
