const jwt = require('jsonwebtoken');

const JWT_SECRET = 'hellobro'

// you have to add middleware to everywhere you need the user to be authenticated
//here next refers to the next middleware i.e in case of ROUTE 3 it is async (req, res) => {}

const fetchUser = (req, res, next) => {
    //Get the user from the jwt token and add id to request object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }

}

module.exports = fetchUser;