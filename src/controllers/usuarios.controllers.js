import bcrypt from "bcrypt";
import Usuario from "../models/Usuario.js";
import conectarDB from "../database/db.js";
import generarJWT from "../helpers/generarJWT.js";

export const registrarUsuario = async (req, res) => {
  try {
    await conectarDB();

    const { nombre, email, password } = req.body;

    const usuarioExistente = await Usuario.findOne({ email });

    if (usuarioExistente) {
      return res.status(400).json({
        mensaje: "Ya existe un usuario con ese email",
      });
    }

    const passwordHasheado = await bcrypt.hash(password, 10);

    const nuevoUsuario = new Usuario({
      nombre,
      email,
      password: passwordHasheado,
    });

    await nuevoUsuario.save();

    res.status(201).json({
      mensaje: "Usuario registrado correctamente",
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error.message);
    res.status(500).json({
      mensaje: "Error al registrar usuario",
    });
  }
};

export const loginUsuario = async (req, res) => {
  try {
    await conectarDB();

    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({
        mensaje: "Email o contraseña incorrectos",
      });
    }

    const passwordValido = await bcrypt.compare(password, usuario.password);

    if (!passwordValido) {
      return res.status(400).json({
        mensaje: "Email o contraseña incorrectos",
      });
    }

    const token = generarJWT({
      id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
    });

    res.status(200).json({
      mensaje: "Login correcto",
      nombre: usuario.nombre,
      email: usuario.email,
      token,
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error.message);
    res.status(500).json({
      mensaje: "Error al iniciar sesión",
    });
  }
};