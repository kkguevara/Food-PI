const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  sequelize.define('recetas', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resumen_del_plato: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    nivel_de_comida_saludable: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    paso_a_paso: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    uuid: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
    {
      timestamps: false,
      freezeTableName: true
    })
};

