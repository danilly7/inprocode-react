import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('revenue', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const syncroModel = async () => {
  try {
    //sincroniza el modelo con la base de datos (crea la tabla si no existe)
    //con "alter: true" se sincronizan las columnas y se crean/eliminan si fuera necesario
    await sequelize.sync({ alter: true }); //o force: true
    console.log('Modelos sincronizados con la base de datos');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await syncroModel();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export { sequelize, testConnection, syncroModel };