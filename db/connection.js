const Sequelize = require('sequelize');

const sequelize = new Sequelize('prueba', 'sa', '12345', {
    host: 'DESKTOP-P23ASPV',
    dialect: 'mssql',
    driver: 'tedious',
    port: 1433
});

try {
    sequelize.authenticate();
        console.log('Connection has been established successfully.');
  } catch (err) {
        console.error('Unable to connect to the database:', err);
  }

module.exports= sequelize;
