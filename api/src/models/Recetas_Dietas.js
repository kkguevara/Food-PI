const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('recetas_dietas', {
    id_recetas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_dietas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
    {
      timestamps: false,
      freezetablename: true
    });
};
