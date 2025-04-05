'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.belongsTo(models.School, { foreignKey: 'schoolId' });
    }
  }
  Event.init({
    schoolId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Schools',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    location: DataTypes.STRING,
    date: DataTypes.DATE,
    time: DataTypes.TIME,
    price: DataTypes.DECIMAL,
    imageUrl: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};