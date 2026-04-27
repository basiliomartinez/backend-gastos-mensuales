import jwt from "jsonwebtoken";

const verificarJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        mensaje: "Token no proporcionado",
      });
    }

    const token = authHeader.split(" ")[1];

    const payload = jwt.verify(token, process.env.SECRET_JWT);

    req.usuario = payload;

    next();
  } catch (error) {
    console.error("Error al verificar JWT:", error.message);
    return res.status(401).json({
      mensaje: "Token inválido o vencido",
    });
  }
};

export default verificarJWT;