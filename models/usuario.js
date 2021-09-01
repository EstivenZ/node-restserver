const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/connection');

class Usuario extends Model {}

Usuario.init({
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    img: {
        type: DataTypes.STRING(10)
    },
    rol: {
        type: DataTypes.ENUM('ADMIN_ROLE', 'USER_ROLE'),
        allowNull: false
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    google: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    } 
    }, {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'Usuario', // We need to choose the model name
        tableName: 'Usuario',
        timestamps: false //Se usa para evitar que se creen columnas CreatedAt-UpdatedAt
});

//Sincroniza el modelo de la bd
//sequelize.sync({ force: true })

module.exports= Usuario;