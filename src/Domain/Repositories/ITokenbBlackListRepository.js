
class ITokenBlackListRepository {
    async add(token, expiresIn) { throw new Error("Method 'add' must be implemented.");}
    async exixts(token) { throw new Error("Method 'exists' must be implemented.");}

}
module.exports = ITokenBlackListRepository;
