import Gasto from "../models/Gasto.js";

export const obtenerGastos = async (req, res) => {
  try {
    const gastos = await Gasto.find().sort({ vencimiento: 1 });

    res.status(200).json(gastos);
  } catch (error) {
    console.error("Error al obtener los gastos:", error);
    res.status(500).json({ mensaje: "Error al obtener los gastos" });
  }
};