class Email {
    constructor(value){
        if(!this.validate(value)){
            throw new Error("Invalid email");
        }
        this.value = value;
    }

    validate(email){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    equals(otherEmail){
        return otherEmail instanceof Email && this.value === otherEmail.value;
        
    }
}

module.exports = Email;
