import jwt from "jsonwebtoken";

const generarJWT = (payload) => {
  return jwt.sign(payload, process.env.SECRET_JWT, {
    expiresIn: "2h",
  });
};

export default generarJWT;