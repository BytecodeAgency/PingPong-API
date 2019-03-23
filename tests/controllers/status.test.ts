import request from 'supertest';
import app from '../../server/app';

describe('status route', () => {
    it('should return status OK', () => {
        request(app)
            .get('/api/v1/status')
            .end((err, res) => {
                expect(res.status).toBe(200);
            });
    });
});
