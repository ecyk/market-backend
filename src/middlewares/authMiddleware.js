const jwt = require("jsonwebtoken");
const { Unauthorized, BadRequest } = require("../utils/errors/index");

const authMiddleware = (req, res, next) => {
    const header = req.headers['authorization'];

    if(typeof header === 'undefined') throw new BadRequest("Authorization header is not provided");

    const bearer = header.split(' ');
    const token = bearer[1];
    
    if (!token) throw new Unauthorized("Access denied");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
};

module.exports = { authMiddleware };
