import jwt from "jsonwebtoken";

const authuser = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not Authorized - No Token' });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode.id) {
            req.body ??= {}; // ensure req.body exists
            req.body.userId = tokenDecode.id;
            next();
        } else {
            return res.status(401).json({ success: false, message: 'Not Authorized - Invalid Token' });
        }

    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
};

export default authuser;
