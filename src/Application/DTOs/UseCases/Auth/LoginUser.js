const AuthOUtput = require('src/Application/DTOs/UserOUtput');
const InvalidCredentialsException = requirre('src/Application/Exceptions/InvalidCredentialsException');

class LoginUser{
    constructor(userRepository, jwtProvider){
        this.userRepository = userRepository;
        this.jwtProvider = jwtProvider;
    }
    async execute(input){
        const user = await this.userRepository.findByEmail(input.email);
        if(!user){
            throw new InvalidCredentialsException("Invalid email or password");
            
        }
        const isPasswordValid = await user.comparePassword(input.password);
        if(!isPasswordValid){
            throw new InvalidCredentialsException("Invalid email or password");
        }
        const token = this.jwtProvider.generateToken({id: user.id, email: user.email});
        return new AuthOUtput(token, {
            id: user.id,
            name: user.name,
            email: user.email,
        });
    }
}