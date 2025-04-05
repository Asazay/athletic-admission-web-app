'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class School extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      School.hasMany(models.Event, { foreignKey: 'schoolId' });
      School.belongsTo(models.User, { foreignKey: 'id' });
    }
  }
  School.init({
    principalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    name: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    address: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'School',
  });
  return School;
};