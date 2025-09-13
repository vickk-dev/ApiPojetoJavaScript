const Email = require("./ValueObjects/Email.js");
const  Password = require("./ValueObjects/Password.js");
const Name = require("./ValueObjects/Name.js");
const { uuidv4 } = require("uuid");

class User {
    constructor(name, email, password, id = uuidv4()){
        if(!name || !email || !password){
            throw new Error('Name, email and password are required');
        }
        this.id = id;
        this.name = new Name(name);
        this.email = new Email(email);
        this.password = new Password(password);


    }
    async comparePassword(plainPassaword){
        return await this.password.compare(plainPassaword);
    }
    updatePassword(newPassword){
        this.password = new Password(newPassword);
    }
    toObject(){
        return {
            id: this.id,
            name: this.name.value,
            email: this.email.value,
            password: this.password.hashedPassword
        };
    }
}
module.exports = User;