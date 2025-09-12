const User =require('src/Domain/User/User');
const UserOutput = require('src/Application/DTOs/UserOutput');
const UserAlreadyExistsException = require ('src/Application/Exceptions/UserAlreadyExistsException');

class RegisterUser{
    constructor(userRepository){
        this.userRepository = userRepository;
    }
    async execute(input){
        const existingUser = await this.userRepository.findByEmail(input.email);
        if(existingUser){
            throw new UserAlreadyExistsException('User with this email already exists');
        }
        const usser = new User(input.name, input.email, input.password);
        await this.userRepository.save(user);
        return new UserOutput(user);
    }
}
module.exports = RegisterUser;