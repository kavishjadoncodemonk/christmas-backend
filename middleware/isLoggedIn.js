const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token = req.header("authorization");
  if (!token) return res.status("401").json({ error: "Access denied" });
  token = token.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status("400").json({ error: "Invalid Token" });
  }
};
