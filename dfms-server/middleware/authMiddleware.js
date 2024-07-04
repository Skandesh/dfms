const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access Denied / No token provided' });
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Access Denied / Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

module.exports = { ensureAuthenticated };
