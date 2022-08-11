const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {

    const token = req.header('x-auth-token');

    if (!token) {
        res.status(400).json({
            "errors": [
                {
                    "msg": "No token found",
                }
            ]
        })
    } else {

        try {
            let user = await JWT.verify(token, process.env.Jwt_Key_secret)
            req.user = user.email;
            next();
        } catch (error) {
            res.status(400).json({
                "errors": [
                    {
                        "msg": "Access denied",
                    }

                ]
            })
        }
    }
}