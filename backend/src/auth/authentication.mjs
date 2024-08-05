import jwt from 'jsonwebtoken';

const authentication = async function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];
    if (!token) {
      return res.status(401).send({ status: false, message: "Please log in First " });
    } else {
      const decodedToken = jwt.verify(token, "userCreatedToken");
      req.decodedToken = decodedToken;
      next();
    }
  } catch (err) {
    return res.status(401).send({ status: false, message: "Authentication failed" });
  }
};

export { authentication };
