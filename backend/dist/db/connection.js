"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('revenue', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});
const syncroModel = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //sincroniza el modelo con la base de datos (crea la tabla si no existe)
        //con "alter: true" se sincronizan las columnas y se crean/eliminan si fuera necesario
        yield sequelize.sync({ force: false }).then(() => {
            console.log('Modelos sincronizado con la base de datos');
        });
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
const testConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        console.log('Connection has been established successfully.');
        yield syncroModel();
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
exports.default = sequelize;
testConnection();
