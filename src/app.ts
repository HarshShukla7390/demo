import express, { Application } from 'express';
import morgan from 'morgan';
import http from 'http';

// Routes
import postRoutes from './routes/post.routes';

export default class App {

    private app: Application;
    public express: express.Application;


    constructor(private port?: number | string) {
        this.express = express();
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    
    public async init(): Promise<void> {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

 
    settings() {
        this.app.set('port', 3000);
    }

    middlewares() {
        this.app.use(morgan('dev'));
        // this.app.use(express.urlencoded({extended:false}));
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/articles', postRoutes);
    }

    async listen() {
        // await this.app.listen( this.app.get('port'));
        // console.log( `server started at http://localhost:${ this.app.get('port') }` );
        const httpServer: http.Server = this.app.listen(3000, () => {
            console.log('server started at http://localhost:3000');
          });

          return httpServer;
        
    }
    
}