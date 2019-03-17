import * as fs from 'fs';

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
    const key = current.keys[0];
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

const settings = {
    jwtSecret: dotEnv.JWT_SECRET,
};

export default settings;

