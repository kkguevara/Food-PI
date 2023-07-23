const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Recetas_Dietas', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    recetaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dietaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
    {
      timestamps: false
    });
};
