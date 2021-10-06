
export const jwtConfig = {
    secretOrPrivateKey: process.env.TOKEN,
    signOptions: { expiresIn: '10s' },
}

export const dbConfig = process.env.DB_URL;

