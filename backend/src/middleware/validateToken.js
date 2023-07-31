const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;

  const token = authorization;

  if (!token) {
    return res.status(401).json({ msg: "You're not logged in" });
  }

  const verified = jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'User is not authorized' });
    }
    next();
  });
};

module.exports = validateToken;
