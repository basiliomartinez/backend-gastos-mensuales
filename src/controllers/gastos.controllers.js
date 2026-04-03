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

export const crearGasto = async (req, res) => {
  try {
    const { nombre, monto, vencimiento, estado, fechaPago } = req.body;

    const nuevoGasto = new Gasto({
      nombre,
      monto,
      vencimiento,
      estado,
      fechaPago,
    });

    await nuevoGasto.save();

    res.status(201).json({
      mensaje: "Gasto creado correctamente",
      gasto: nuevoGasto,
    });
  } catch (error) {
    console.error("Error al crear el gasto:", error);
    res.status(500).json({ mensaje: "Error al crear el gasto" });
  }
};

export const pagarGasto = async (req, res) => {
  try {
    const { id } = req.params;

    const gastoActualizado = await Gasto.findByIdAndUpdate(
      id,
      {
        estado: "pagado",
        fechaPago: new Date(),
      },
      { new: true }
    );

    if (!gastoActualizado) {
      return res.status(404).json({ mensaje: "Gasto no encontrado" });
    }

    res.status(200).json({
      mensaje: "Gasto marcado como pagado",
      gasto: gastoActualizado,
    });
  } catch (error) {
    console.error("Error al pagar el gasto:", error);
    res.status(500).json({ mensaje: "Error al pagar el gasto" });
  }
};