import { stringToNumber } from '../../helpers/string-helpers';

describe('stringToNumber', () => {
    it('should convert strings to numbers', () => {
        const testString = '42';
        const converted = stringToNumber(testString);
        expect(typeof converted).toBe('number');
        expect(converted).toBe(42);
    });

    it('should convert strings to negative numbers', () => {
        const testString = '-42';
        const converted = stringToNumber(testString);
        expect(typeof converted).toBe('number');
        expect(converted).toBe(-42);
    });

    it('should convert strings to zero', () => {
        const testString = '0';
        const converted = stringToNumber(testString);
        expect(typeof converted).toBe('number');
        expect(converted).toBe(0);
    });

    it('should give NaN when converting is not possible', () => {
        const testString = 'not possible';
        const converted = stringToNumber(testString);
        expect(typeof converted).toBe('number');
        expect(converted).toBe(NaN);
    });
});
