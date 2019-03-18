import settings from '../settings';

describe('settings', () => {
    it('JWT should be available', () => {
        expect(settings.jwtSecret).toBeDefined();
        expect(settings.jwtSecret).not.toBe('');
        expect(typeof settings.jwtSecret).toBe('string');
    });

    it('JWT expires in days should be available', () => {
        expect(settings.jwtExpiresInDays).toBeDefined();
        expect(settings.jwtExpiresInDays).not.toBe(NaN);
        expect(typeof settings.jwtExpiresInDays).toBe('number');
    });

    it('Salt rounds should be available', () => {
        expect(settings.saltRounds).toBeDefined();
        expect(settings.saltRounds).not.toBe(NaN);
        expect(typeof settings.saltRounds).toBe('number');
    });
});

