const {Router} = require('express');
const AuthController = require('src/Controllers/AuthController');
const validate = require('src/Infrastructure/Express/middlewares/ValidationMiddleware');
const{registerSchema, loginSchema} = require('src/Infrastructure/Express/schemas/AuthSchemas');

module.exports = (registerUserUsecase, loginUserUsecase) => {
    const router = Router();
    const authController = new AuthController(registerUserUsecase, loginUserUsecase);

    router.post('/register', validate(registerSchema), authController.register.bind(authController));
    router.post('/login', validate(loginSchema), authController.login.bind(authController));

    return router;
};