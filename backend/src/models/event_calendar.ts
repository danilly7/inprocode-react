import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Event = db.define('event', {
    id_event: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING(7),
        allowNull: true,
    },
}, {
    tableName: 'events',
    timestamps: false,
});

export default Event;