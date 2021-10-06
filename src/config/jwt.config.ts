export const jwtConfig = {
    secretOrPrivateKey: process.env.TOKEN,
    signOptions: { expiresIn: '10s' },
}