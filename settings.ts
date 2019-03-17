require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

const settings = {
    jwtSecret,
};

export default settings;

