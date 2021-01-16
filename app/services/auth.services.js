const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");

exports.verifyToken = async (token) => {
    console.log('verify ' + token);
    if (!token) {
        console.log("no token");
        return false;
    }

    try {
        let response = await jwt.verify(token, config.secret);
        return response.id;
    
    } catch (err) {
        console.log(err);
        return false;
    }
}


exports.signToken = (id) => {
    let token = jwt.sign({ id: id }, config.secret, { expiresIn: 24000 });
    return token;
}