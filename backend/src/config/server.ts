import express, { Application, Request, Response } from 'express';
import routesRevenue from '../routes/revenue';
import db from '../db/connection';
import cors from 'cors';

export class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.middlewares();
        this.routes();
        this.dbConnect();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicacion corriendo en el puerto ${this.port}`)
        })
    }

    routes() {
        this.app.get('/', (req: Request, res: Response) => {
            res.json({
                msg: 'API working'
            })
        })
        this.app.use('/api/revenue', routesRevenue)
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
            await db.authenticate()
            console.log('Base de datos conectada')
        } catch (error) {
            console.log(error);
            console.log('Drama: Ha habido un error al conectarse a la base de datos');
        }
    }
};