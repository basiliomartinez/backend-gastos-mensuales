import Gasto from "../models/Gasto.js";
import conectarDB from "../database/db.js";

export const listarGastos = async (req, res) => {
  try {
    await conectarDB();

    const tipo = req.query.tipo;
    const filtro = tipo ? { tipo } : {};

    const gastos = await Gasto.find({
      ...filtro,
      usuario: req.usuario.id,
    }).sort({ vencimiento: 1 });

    res.status(200).json(gastos);
  } catch (error) {
    console.error("Error al listar los gastos:", error.message);
    res.status(500).json({ mensaje: "Error al obtener los gastos" });
  }
};

export const crearGasto = async (req, res) => {
  try {
    await conectarDB();

    const nuevoGasto = new Gasto({
      ...req.body,
      usuario: req.usuario.id,
    });

    await nuevoGasto.save();

    res.status(201).json({
      mensaje: "Gasto creado correctamente",
      gasto: nuevoGasto,
    });
  } catch (error) {
    console.error("Error al crear el gasto:", error.message);
    res.status(500).json({ mensaje: "Error al crear el gasto" });
  }
};

export const pagarGasto = async (req, res) => {
  try {
    await conectarDB();

    const { id } = req.params;

    const gastoActualizado = await Gasto.findOneAndUpdate(
      {
        _id: id,
        usuario: req.usuario.id,
      },
      {
        estado: "pagado",
        fechaPago: new Date(),
      },
      { returnDocument: "after" }
    );

    if (!gastoActualizado) {
      return res.status(404).json({ mensaje: "Gasto no encontrado" });
    }

    res.status(200).json({
      mensaje: "Gasto marcado como pagado",
      gasto: gastoActualizado,
    });
  } catch (error) {
    console.error("Error al pagar el gasto:", error.message);
    res.status(500).json({ mensaje: "Error al pagar el gasto" });
  }
};

export const activarGastoFuturo = async (req, res) => {
  try {
    await conectarDB();

    const { id } = req.params;

    const gastoActualizado = await Gasto.findOneAndUpdate(
      {
        _id: id,
        usuario: req.usuario.id,
      },
      {
        tipo: "mensual",
      },
      { returnDocument: "after" }
    );

    if (!gastoActualizado) {
      return res.status(404).json({ mensaje: "Gasto no encontrado" });
    }

    res.status(200).json({
      mensaje: "Gasto futuro pasado a mensuales",
      gasto: gastoActualizado,
    });
  } catch (error) {
    console.error("Error al activar el gasto futuro:", error.message);
    res.status(500).json({ mensaje: "Error al activar el gasto futuro" });
  }
};

export const eliminarGasto = async (req, res) => {
  try {
    await conectarDB();

    const { id } = req.params;

    const gastoEliminado = await Gasto.findOneAndDelete({
      _id: id,
      usuario: req.usuario.id,
    });

    if (!gastoEliminado) {
      return res.status(404).json({ mensaje: "Gasto no encontrado" });
    }

    res.status(200).json({
      mensaje: "Gasto eliminado correctamente",
      gasto: gastoEliminado,
    });
  } catch (error) {
    console.error("Error al eliminar el gasto:", error.message);
    res.status(500).json({ mensaje: "Error al eliminar el gasto" });
  }
};