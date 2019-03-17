import * as fs from 'fs';
import { stringToNumber } from './helpers/string-helpers';

type Dict = { [key: string]: string };

const keyValueMapper = (entryString: string): Dict => {
    const splittedString: string[] = entryString.split('=');
    const key: string = splittedString[0];
    const value: string = splittedString[1];
    const newEntry: Dict = {};
    newEntry[key] = value;
    return newEntry;
};

const keyValuesToObject = (accumulator: {}, current: Dict): Dict => {
    const keys = Object.keys(current);
    const key = keys[0];
    const value = current[key];
    const newAccumulator: Dict = accumulator;
    newAccumulator[key] = value;
    return newAccumulator;
};

const dotEnvFile = fs.readFileSync('.env', 'UTF-8');
const dotEnv = dotEnvFile
    .split('\n')
    .filter(entry => entry)
    .map(entry => keyValueMapper(entry))
    .reduce(keyValuesToObject);

const settings: Settings = {
    jwtSecret: dotEnv.JWT_SECRET,
    jwtExpiresInDays: stringToNumber(dotEnv.JWT_EXPIRES_IN_DAYS),
    saltRounds: stringToNumber(dotEnv.SALT_ROUNDS),
};

export default settings;

interface Settings {
    jwtSecret: string;
    jwtExpiresInDays: number;
    saltRounds: number;
}
