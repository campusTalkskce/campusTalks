const jwt = require("jsonwebtoken");

const verifytoken = (req, res, next) => {
  const authheader = req.headers["authorization"];
  const token = authheader && authheader.split(" ")[1];
  if (!token) return res.json({ msg: "access denied..." });
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (err) {
    res.json({ msg: err.message });
  }
};
module.exports = verifytoken;