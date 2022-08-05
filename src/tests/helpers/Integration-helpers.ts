import * as express from 'express';
import App from '../../app';
import { setGlobalEnvironment } from '../../global';
import Environment from '../../environments/environment';
import { Environments } from '../../environments/environment.constant';


export default class IntegrationHelpers {

    public static appInstance: express.Application;
    public static appConn: any;

    public static async getApp(): Promise<express.Application> {
        if (this.appInstance) {
            return this.appInstance;
        }
        const env: Environment = new Environment(Environments.TEST);
        setGlobalEnvironment(env);
        const app: App = new App(3000);
        await app.init();
       // await app.listen();
        this.appInstance = app.express;
        this.appConn = app.listen();

        return this.appConn;
    }

}


