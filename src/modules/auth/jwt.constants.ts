export const jwtConstants = {
  secret: process.env.JWT_SECRET_KEY,
  expiresIn: process.env.TOKEN_EXPIRE_TIME,
  refreshExpiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
  cryptSalt: +process.env.CRYPT_SALT,
};


