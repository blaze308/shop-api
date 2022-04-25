const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const tokenWithBearer = req.headers.authorization;

  if (!tokenWithBearer) {
    // getting token from the headers
    return res.status(403).json({ error: "user not authenticated" });
  }

  const token = tokenWithBearer.split(" ")[1];

  try {
    //verify if token is correct
    const user = jwt.verify(token, "secret");

    //attached the user to the req
    req.user = user;
  } catch (error) {
    //
    return res.status(403).json({ error: "user not authenticated" });
  }

  next();
};

module.exports = {
  verifyToken,
};
