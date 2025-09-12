const RegidsterUserInput = require("../../Application/UseCases/RegisterUser/RegisterUserInput");
const LoginUserInput = require("../../Application/UseCases/LoginUser/LoginUserInput");


class AuthController{
    constructor(registerUserUsecase, loginUserUsecase){
        this.registerUserUsecase = registerUserUsecase;
        this.loginUserUsecase = loginUserUsecase;
    }
    async register(req, res, next){
        try {
            const userInput = new RegisterUserInput(req.body);
            const input = new RegisterUserInput(name, email, password);
            const userOutput = await this.registerUserUsecase.execute(userInput);
            return res.status(201).json(userOutput);
        } catch (error) {
            next(error);
        }
    }
    async login(req, res, next){
        try {
            const {email, password} = req.body;
            const input = new LoginUserInput(email, password);
            const authOutput = await this.loginUserUsecase.execute(input);
            return res.status(200).json(authOutput);
        } catch (error) {
            next(error);
        }
    }
    async logout(req, res, next){
        try{
            const { userId } = req;
            await this.logoutUserUsecase.execute(userId);
            return res.status(204).json({message:"Logged out successfully"});
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AuthController;