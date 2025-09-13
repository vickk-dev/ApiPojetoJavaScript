const jwt = require('jsonwebtoken');
const config = require('../config');
const { get } = require('../app');

class JWTProvider{
    generateToken(payloud){
        return jwt.sign(payloud, config.jwt.secret, {expiresIn: config.jwt.expiresIn});
   
    }

    verifyToken(token){
        try{
            return jwt.verify(token, config.jwt.secret);
        } catch (error){
            return null;
        }
    }
    getTokenExpiration(token){
      const expiresIn = config.jwt.expiresIn;
        if (expiresIn.endsWith('h')) {
            return parseInt(expiresIn) * 3600;
        }
        if (expiresIn.endsWith('m')) {
            return parseInt(expiresIn) * 60;
        }
        if (expiresIn.endsWith('d')) {
            return parseInt(expiresIn) * 24 * 3600;
        }
        return parseInt(expiresIn);
    }
}
module.exports = JWTProvider;