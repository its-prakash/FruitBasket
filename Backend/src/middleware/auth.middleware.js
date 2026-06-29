const jwt = require('jsonwebtoken');


async function authUser(req, res, next) {

    try {
        
        // const token = req.cookies.token;
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded ;

        next();
    } catch (err) {
        return res.status(401).json({
            message: "invalid token"
        })
    }

}

module.exports = authUser;