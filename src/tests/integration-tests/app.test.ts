import 'jest';
import express from 'express';
import request from 'supertest';
import { connect } from '../../database'
import {
    StatusCodes,
} from 'http-status-codes';
import IntegrationHelpers from '../helpers/Integration-helpers';

describe('status integration tests', () => {
    let app: express.Application;

    beforeAll(async () => {
        app = await IntegrationHelpers.getApp();
    });

    afterAll(async () => {
        const conn = await connect();
        // Closing the DB connection allows Jest to exit successfully.
        await conn.end();
    })

    it('should get the data', async () => {
        await request(app)
            .get('/articles/1')
            .expect(StatusCodes.OK);
    });

    it('should get blank data', async () => {
        await request(app)
            .get('/articles/4')
            .expect(StatusCodes.OK);
    });

    it('should get the all data', async () => {
        await request(app)
            .get('/articles')
            .expect(StatusCodes.OK);
    });

});
