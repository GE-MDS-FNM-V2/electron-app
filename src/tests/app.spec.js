describe('Testing /remoteExecute endpoint', () => {

    beforeEach(() => {
        jest.resetModules();
    });

    test('with CSM success returns JSON object with data key/value pair', () => {
        const request = require('supertest');
        jest.mock('electron-is-dev', () => {
            return true
        });
        jest.mock('@ge-fnm/csm', () => {
            return {
                executeCommunication: () => Promise.resolve("success")
            };
        });
        const app = require('../app');
        return request(app)
            .post('/remoteExecute')
            .send({serializedAction: "any string"})
            .then(res => {
                expect(res.status).toBe(200)
                expect(res.body.data).toBe("success")
            });
    });

    test('with CSM failure returns error status code', () => {
        const request = require('supertest');
        jest.mock('electron-is-dev', () => {
            return true
        });
        jest.mock('@ge-fnm/csm', () => {
            return {
                executeCommunication: () => Promise.reject(new Error("error"))
            };
        });
        const app = require('../app');
        return request(app)
            .post('/remoteExecute')
            .send({serializedAction: "any string"})
            .then(res => {
                expect(res.status).toBe(500)
            })
    });

    test('with no serializedAction parameter returns a 400 error', () => {
        const request = require('supertest');
        jest.mock('electron-is-dev', () => {
            return true
        });
        jest.mock('@ge-fnm/csm', () => {
            return {
                executeCommunication: () => Promise.resolve('hello')
            };
        });
        const app = require('../app');
        const { MISSING_ACTION_OBJ_MSG } = require('../constants/errorMessages')
        return request(app)
            .post('/remoteExecute')
            .send({data: "any string"})
            .then(res => {
                expect(res.status).toBe(400)
                expect(res.body.error).toBe(MISSING_ACTION_OBJ_MSG)
            });
    });

    afterAll(() => {
        jest.resetModules();
    });

});