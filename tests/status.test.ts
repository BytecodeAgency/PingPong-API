import request from 'supertest'; // tslint:disable-line
import app from '../server/app';

describe('status route', () => {
    it('should return status OK', () => {
        request(app)
            .get('/status')
            .end((err, res) => {
                expect(res.status).toBe(200);
            });
    });
});
