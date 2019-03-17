import * as jwt from 'jwt-simple';
import settings from '../../settings';
import authHelper from '../../helpers/auth';

const { jwtExpiresInDays } = settings;
const testPassword = 'the_test_password';
const getPasswordHash = async () =>
    authHelper.generatePasswordHash(testPassword);

const baseTimeDate = new Date();
const baseTime = baseTimeDate.setDate(baseTimeDate.getDate());

const payloadData = {
    user: 'Test',
};

describe('Authentication helper', () => {
    test('generatePasswordHash should not return the password', async () => {
        expect.assertions(1);
        const testPasswordHash = await getPasswordHash();
        expect(testPasswordHash).not.toBe(testPassword);
    });

    test('generatePasswordHash should return a string', async () => {
        expect.assertions(1);
        const testPasswordHash = await getPasswordHash();
        expect(typeof testPasswordHash).toBe('string');
    });

    test('generatePasswordHash should generate a valid hash', async () => {
        expect.assertions(1);
        const testPasswordHash = await getPasswordHash();
        const passwordCheck =
            await authHelper.checkPasswordHash(testPassword, testPasswordHash);
        expect(passwordCheck).toBe(true);
    });

    test('generateJWT should return a string', () => {
        const authToken = authHelper.generateJWT(payloadData);
        expect(typeof authToken).toBe('string');
    });

    test('decodeJWT should return the correct payload', () => {
        const authToken = authHelper.generateJWT(payloadData);
        const decodedPayload = authHelper.decodeJWT(authToken);
        expect(decodedPayload.data).toEqual(payloadData);
    });

    test('JWT dates create a valid date object', () => {
        const authToken = authHelper.generateJWT(payloadData);
        const decodedPayload = authHelper.decodeJWT(authToken);
        const payloadDate = new Date(decodedPayload.exp);
        expect(payloadDate).toBeInstanceOf(Date);
    });

    test('JWT expiry date should be in the future', () => {
        const authToken = authHelper.generateJWT(payloadData, baseTime);
        const decodedPayload = authHelper.decodeJWT(authToken);
        const payloadExp = decodedPayload.exp;
        expect(payloadExp).toBeGreaterThan(baseTime);
    });

    test('JWT issued at date should be now', () => {
        const authToken = authHelper.generateJWT(payloadData, baseTime);
        const decodedPayload = authHelper.decodeJWT(authToken);
        const payloadIssuedAt = decodedPayload.iat;
        expect(payloadIssuedAt).toBe(baseTime);
    });

    test('JWT should expire in JWT_EXPIRES_IN_DAYS +/- 1 days', () => {
        const authToken = authHelper.generateJWT(payloadData, baseTime);
        const decodedPayload = authHelper.decodeJWT(authToken);
        const payloadIssuedAtDate = decodedPayload.iat;
        const payloadExpiryDate = decodedPayload.exp;

        const msPerDay = 1000 * 60 * 60 * 24;
        const msDifference = payloadExpiryDate - payloadIssuedAtDate;
        const expiresInDays = msDifference/msPerDay;

        const maxDifference = 1;
        const upperBound = jwtExpiresInDays + maxDifference;
        const lowerBound = jwtExpiresInDays - maxDifference;

        expect(expiresInDays).toBeGreaterThanOrEqual(lowerBound);
        expect(expiresInDays).toBeLessThanOrEqual(upperBound);
    });

    test('decodeJWT should throw error if JWT is invalid', () => {
        const invalidJWT = jwt.encode({ data: 'invalid' }, 'invalid_secret');
        expect(() => authHelper.decodeJWT(invalidJWT)).toThrowError();
    });

    test('validateJWT should throw error if JWT is expired', () => {
        const date = new Date();
        const issuedAt = date.setDate(date.getDate() - jwtExpiresInDays - 9999);
        const expiredJWT = authHelper.generateJWT(payloadData, issuedAt);
        expect(() => authHelper.validateJWT(expiredJWT))
            .toThrowError('Token expired');
    });

    test('validateJWT should return data if JWT is valid, not expired', () => {
        const validJWT = authHelper.generateJWT(payloadData, baseTime);
        const payload = authHelper.generatePayload(payloadData, baseTime);
        const receivedDate = authHelper.validateJWT(validJWT).data;
        const expectedData = payload.data;
        expect(receivedDate).toEqual(expectedData);
    });
});
