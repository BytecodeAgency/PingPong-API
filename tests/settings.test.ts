import settings from '../settings';

describe('settings', () => {
    it('all settings are available', () => {
        expect(settings.jwtSecret).toBeDefined();
    });
});

