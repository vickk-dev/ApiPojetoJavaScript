const {Router} = require('express');
const AuthController = require('../../controllers/AuthController');
const validate = require('../validationMiddlewares');
const{registerSchema, loginSchema} = require('../../schemas/AuthSchemas');

module.exports = (registerUserUsecase, loginUserUsecase) => {
    const router = Router();
    const authController = new AuthController(registerUserUsecase, loginUserUsecase);

    router.post('/register', validate(registerSchema), authController.register.bind(authController));
    router.post('/login', validate(loginSchema), authController.login.bind(authController));
    router.post('/logout', authenticateToken, authController.logout.bind(authController));
    router.get('/profile', authenticateToken, authController.profile.bind(authController))

    return router;
};