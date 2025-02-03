import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import revenueRouter from '../routes/revenue';
import calendarRouter from '../routes/calendar';
import competitorRouter from '../routes/competitors';
import { insertInitialData } from '../utils/start_data';
import { sequelize, syncroModel, testConnection } from '../db/connection';

export class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.middlewares();
        this.routes();
        this.start();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicacion corriendo en el puerto ${this.port}`)
        })
    }

    async start() {
        await testConnection();
        await insertInitialData();
    }

    routes() {
        this.app.get('/', (req: Request, res: Response) => {
            res.json({
                msg: 'API working'
            })
        })
        this.app.use('/api/revenue', revenueRouter);
        this.app.use('/api/events', calendarRouter);
        this.app.use('/api/competitors', competitorRouter);
    }

    middlewares() {
        this.app.use(cors({})); //esto habilita el cors, cualquiera puede hacer solicitudes a la api ahora mismo

        // this.app.use(cors({ // esto de abajo es para restringirlo
        //     origin: 'https://blalbblablalb.com',
        //     methods: ['GET', 'POST', 'PUT'], // puedo poner los que quiera permitir
        //     allowedHeaders: ['Content-Type', 'Authorization'] // Encabezados permitidos, el tema de jwt tokens...
        // }));

        this.app.use(express.json()); //se parsea el body aka pasamos datos de un formato a otro.
    }

    async dbConnect() {
        try {
            await sequelize.authenticate();
            console.log('Base de datos conectada');
            await syncroModel();
        } catch (error) {
            console.log(error);
            console.log('Drama: Ha habido un error al conectarse a la base de datos');
        }
    }
};