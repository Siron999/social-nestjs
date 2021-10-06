const  dotenv= require('dotenv').config({path:"./.env"});

export const jwtConfig = {
    secretOrPrivateKey: process.env.TOKEN,
    signOptions: { expiresIn: '14d' },
}

export const dbConfig = process.env.DB_URL;

