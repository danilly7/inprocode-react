import { DataTypes } from 'sequelize';
import db from '../db/connection';

const DailyRev = db.define('daily_revenue', {
    id_dailyrev: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    closed: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    weekday_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    bank_holiday: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    total_sales: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    total_clients: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'daily_revenue',
    timestamps: false, //esto es para createdAt y updatedAt!
});

export default DailyRev;