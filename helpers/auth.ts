const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');

const saltRounds: number = 10;
const JWT_SECRET: string = 'secret'; // TODO: Integrate .env
const jwtExpiresInDays: number = 7;

const generatePasswordHash =
    async (plainText: string): Promise<string> => {
        const hashed: string = await new Promise((resolve, reject) =>
            bcrypt.hash(plainText, saltRounds, (err: Error, hash: string) => {
                if (err) {
                    reject(err);
                }
                resolve(hash);
            }),
        );
        return hashed;
    };

const checkPasswordHash =
    async (plainText: string, hashed: string): Promise<boolean> => {
        const match = await bcrypt.compare(plainText, hashed);
        if (match) {
            return true;
        }
        return false;
    };

// continue here

interface IDates {
    iat: number;
    exp: number;
}

const calculateDates = (issuedAtParam: number): IDates => {
    const date = new Date();
    const issuedAt: number = issuedAtParam || date.setDate(date.getDate());
    const issuedAtDate = new Date(issuedAt);
    const expiryDate: number =
        issuedAtDate.setDate(issuedAtDate.getDate() + jwtExpiresInDays);
    const dates: IDates = {
        iat: issuedAt,
        exp: expiryDate,
    };
    return dates;
};


interface IPayload {
    iat: number;
    exp: number;
    data: {};
}

const generatePayload = (data: {}, issuedAt: number): IPayload => {
    const dates = calculateDates(issuedAt);
    const payload: IPayload= {
        ...dates,
        data,
    };
    return payload;
};

const generateJWT = (data: {}, issuedAt: number): string => {
    const payload = generatePayload(data, issuedAt);
    const token: string = jwt.encode(payload, JWT_SECRET);
    return token;
};

const decodeJWT = (token: string): IPayload => {
    const decoded = jwt.decode(token, JWT_SECRET);
    return decoded;
};

interface IPayloadDecoded extends IPayload {
    now: number;
}

const validateJWT = (token: string): IPayloadDecoded => {
    const decoded = decodeJWT(token);
    const date = new Date();
    const now = date.setDate(date.getDate());
    if (decoded.exp < now) {
        throw new Error('Token expired');
    }
    return { ...decoded, now };
};

const authHelper = {
    calculateDates,
    generatePayload,
    generatePasswordHash,
    checkPasswordHash,
    generateJWT,
    decodeJWT,
    validateJWT,
};

export default authHelper;

