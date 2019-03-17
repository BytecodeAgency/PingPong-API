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

const dotEnvFile = fs.readFileSync('.env', 'UTF-8');
const dotEnvArr = dotEnvFile.split('\n').filter(entry => entry);
const dotEnvValues = dotEnvArr.map(entry => keyValueMapper(entry));


const settings = {
    jwtSecret: dotEnv.JWT_SECRET,
};

export default settings;

