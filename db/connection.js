const { Sequelize } = require('sequelize');

const database = new Sequelize('prueba', 'sa', '12345', {
    host: 'DESKTOP-P23ASPV',
    dialect: 'mssql',
    driver: 'tedious',
    port: 1433
});

module.exports= database;
