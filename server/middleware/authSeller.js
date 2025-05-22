import jwt from "jsonwebtoken";

const authSeller = async (req, res, next) => {
    const { sellerToken } = req.cookies;

    if (!sellerToken) {
        return res.status(401).json({ success: false, message: 'Not Authorized - No Token' });
    }

    try {
        const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);

        if (decoded.email === process.env.SELLER_EMAIL) {
            next(); // allow access
        } else {
            return res.status(401).json({ success: false, message: 'Not Authorized - Invalid Token Email' });
        }

    } catch (error) {
        return res.status(401).json({ success: false, message: 'Token Invalid or Expired' });
    }
};

export default authSeller;
